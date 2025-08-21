import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { profileAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: { fr: '', en: '' },
    bio: { fr: '', en: '' },
    email: '',
    phone: '',
    location: '',
    website: '',
    avatar: '',
    years_experience: 0,
    projects_completed: 0,
    happy_clients: 0
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileAPI.getProfile();
      setProfile(data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        title: data.title || { fr: '', en: '' },
        bio: data.bio || { fr: '', en: '' },
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        website: data.website || '',
        avatar: data.avatar || '',
        years_experience: data.years_experience || 0,
        projects_completed: data.projects_completed || 0,
        happy_clients: data.happy_clients || 0
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileAPI.updateProfile(formData);
      await loadProfile();
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Prénom</Label>
                <Input
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label>Nom</Label>
                <Input
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  required
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label>Localisation</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Site Web</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
              <div>
                <Label>URL Avatar</Label>
                <Input
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Bio (Français)</Label>
                <Textarea
                  value={formData.bio.fr}
                  onChange={(e) => setFormData({...formData, bio: {...formData.bio, fr: e.target.value}})}
                  rows={4}
                />
              </div>
              <div>
                <Label>Bio (Anglais)</Label>
                <Textarea
                  value={formData.bio.en}
                  onChange={(e) => setFormData({...formData, bio: {...formData.bio, en: e.target.value}})}
                  rows={4}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Années d'Expérience</Label>
                <Input
                  type="number"
                  value={formData.years_experience}
                  onChange={(e) => setFormData({...formData, years_experience: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label>Projets Terminés</Label>
                <Input
                  type="number"
                  value={formData.projects_completed}
                  onChange={(e) => setFormData({...formData, projects_completed: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label>Clients Satisfaits</Label>
                <Input
                  type="number"
                  value={formData.happy_clients}
                  onChange={(e) => setFormData({...formData, happy_clients: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? 'Mise à jour...' : 'Mettre à jour le Profil'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;