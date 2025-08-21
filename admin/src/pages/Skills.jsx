import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { skillsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 80,
    description: { fr: '', en: '' },
    order: 1,
    published: true
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await skillsAPI.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillsAPI.updateSkill(editingSkill._id, formData);
      } else {
        await skillsAPI.createSkill(formData);
      }
      
      await loadSkills();
      resetForm();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || '',
      level: skill.level || 80,
      description: skill.description || { fr: '', en: '' },
      order: skill.order || 1,
      published: skill.published !== undefined ? skill.published : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      try {
        await skillsAPI.deleteSkill(id);
        await loadSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      level: 80,
      description: { fr: '', en: '' },
      order: 1,
      published: true
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  const categories = ['Writing', 'SEO', 'Marketing', 'Strategy', 'Technical', 'Social Media'];

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compétences</h1>
          <p className="text-gray-600">Gérez vos compétences professionnelles</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Compétence
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSkill ? 'Modifier la Compétence' : 'Nouvelle Compétence'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom de la compétence</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Catégorie</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Niveau (%) : {formData.level}%</Label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                    className="w-full"
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
                  />
                </div>
                <div>
                  <Label>Description (Anglais)</Label>
                  <Textarea
                    value={formData.description.en}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                    rows={3}
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
                  {editingSkill ? 'Mettre à jour' : 'Créer'}
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
        {skills.map((skill) => (
          <Card key={skill._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {skill.level}%
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      skill.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {skill.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                  {skill.description?.fr && (
                    <p className="text-gray-600 mb-2">{skill.description.fr}</p>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${skill.level}%`}}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(skill._id)}>
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

export default Skills;