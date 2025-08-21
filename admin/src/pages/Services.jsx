import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { servicesAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: { fr: '', en: '' },
    description: { fr: '', en: '' },
    icon: 'FileText',
    price: '',
    features: { fr: [], en: [] },
    order: 1,
    published: true
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await servicesAPI.getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        features: {
          fr: Array.isArray(formData.features.fr) ? formData.features.fr : formData.features.fr.split('\n').filter(f => f.trim()),
          en: Array.isArray(formData.features.en) ? formData.features.en : formData.features.en.split('\n').filter(f => f.trim())
        }
      };

      if (editingService) {
        await servicesAPI.updateService(editingService._id, serviceData);
      } else {
        await servicesAPI.createService(serviceData);
      }
      
      await loadServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || { fr: '', en: '' },
      description: service.description || { fr: '', en: '' },
      icon: service.icon || 'FileText',
      price: service.price || '',
      features: {
        fr: Array.isArray(service.features?.fr) ? service.features.fr.join('\n') : '',
        en: Array.isArray(service.features?.en) ? service.features.en.join('\n') : ''
      },
      order: service.order || 1,
      published: service.published !== undefined ? service.published : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await servicesAPI.deleteService(id);
        await loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: { fr: '', en: '' },
      description: { fr: '', en: '' },
      icon: 'FileText',
      price: '',
      features: { fr: [], en: [] },
      order: 1,
      published: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Gérez vos services professionnels</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Service
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingService ? 'Modifier le Service' : 'Nouveau Service'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom (Français)</Label>
                  <Input
                    value={formData.name.fr}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, fr: e.target.value}})}
                    required
                  />
                </div>
                <div>
                  <Label>Nom (Anglais)</Label>
                  <Input
                    value={formData.name.en}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, en: e.target.value}})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Icône</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    placeholder="FileText, PenTool, etc."
                  />
                </div>
                <div>
                  <Label>Prix</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="À partir de 150€"
                    required
                  />
                </div>
                <div>
                  <Label>Ordre d'affichage</Label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Description (Français)</Label>
                  <Textarea
                    value={formData.description.fr}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, fr: e.target.value}})}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label>Description (Anglais)</Label>
                  <Textarea
                    value={formData.description.en}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Fonctionnalités (Français) - Une par ligne</Label>
                  <Textarea
                    value={formData.features.fr}
                    onChange={(e) => setFormData({...formData, features: {...formData.features, fr: e.target.value}})}
                    rows={4}
                    placeholder="Fonctionnalité 1&#10;Fonctionnalité 2&#10;Fonctionnalité 3"
                  />
                </div>
                <div>
                  <Label>Fonctionnalités (Anglais) - Une par ligne</Label>
                  <Textarea
                    value={formData.features.en}
                    onChange={(e) => setFormData({...formData, features: {...formData.features, en: e.target.value}})}
                    rows={4}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="mr-2"
                />
                Publié
              </label>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingService ? 'Mettre à jour' : 'Créer'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{service.name?.fr}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {service.price}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      service.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{service.description?.fr}</p>
                  {service.features?.fr && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-700 mb-1">Fonctionnalités:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {service.features.fr.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                        {service.features.fr.length > 3 && (
                          <li className="text-gray-500">... et {service.features.fr.length - 3} autres</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(service._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;