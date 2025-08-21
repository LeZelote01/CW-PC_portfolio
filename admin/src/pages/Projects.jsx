import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { projectsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDate, truncateText } from '../lib/utils';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: { fr: '', en: '' },
    description: { fr: '', en: '' },
    category: '',
    client: '',
    duration: '',
    year: new Date().getFullYear(),
    image: '',
    tags: [],
    results: { fr: '', en: '' },
    featured: false,
    published: true
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(',').map(tag => tag.trim())
      };

      if (editingProject) {
        await projectsAPI.updateProject(editingProject._id, projectData);
      } else {
        await projectsAPI.createProject(projectData);
      }
      
      await loadProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || { fr: '', en: '' },
      description: project.description || { fr: '', en: '' },
      category: project.category || '',
      client: project.client || '',
      duration: project.duration || '',
      year: project.year || new Date().getFullYear(),
      image: project.image || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      results: project.results || { fr: '', en: '' },
      featured: project.featured || false,
      published: project.published !== undefined ? project.published : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await projectsAPI.deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: { fr: '', en: '' },
      description: { fr: '', en: '' },
      category: '',
      client: '',
      duration: '',
      year: new Date().getFullYear(),
      image: '',
      tags: [],
      results: { fr: '', en: '' },
      featured: false,
      published: true
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const categories = ['Content Strategy', 'Copywriting', 'Technical Writing', 'Blog Writing'];

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-600">Gérez vos projets de portfolio</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Projet
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProject ? 'Modifier le Projet' : 'Nouveau Projet'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Titre (Français)</Label>
                  <Input
                    value={formData.title.fr}
                    onChange={(e) => setFormData({...formData, title: {...formData.title, fr: e.target.value}})}
                    required
                  />
                </div>
                <div>
                  <Label>Titre (Anglais)</Label>
                  <Input
                    value={formData.title.en}
                    onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <Label>Client</Label>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Durée</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="Ex: 2 mois"
                    required
                  />
                </div>
                <div>
                  <Label>Année</Label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <Label>URL Image</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label>Tags (séparés par des virgules)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="React, API, Documentation"
                />
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
                  <Label>Résultats (Français)</Label>
                  <Textarea
                    value={formData.results.fr}
                    onChange={(e) => setFormData({...formData, results: {...formData.results, fr: e.target.value}})}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Résultats (Anglais)</Label>
                  <Textarea
                    value={formData.results.en}
                    onChange={(e) => setFormData({...formData, results: {...formData.results, en: e.target.value}})}
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="mr-2"
                  />
                  Projet mis en avant
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="mr-2"
                  />
                  Publié
                </label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingProject ? 'Mettre à jour' : 'Créer'}
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
        {projects.map((project) => (
          <Card key={project._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{project.title?.fr}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Mis en avant
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {project.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {truncateText(project.description?.fr, 120)}
                  </p>
                  <div className="text-sm text-gray-500">
                    Client: {project.client} • {project.year} • {project.duration}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(project._id)}>
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

export default Projects;