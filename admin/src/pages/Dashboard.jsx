import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { projectsAPI, testimonialsAPI, messagesAPI, skillsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    messages: 0,
    skills: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [projects, testimonials, messages, skills] = await Promise.all([
        projectsAPI.getProjects(),
        testimonialsAPI.getTestimonials(),
        messagesAPI.getMessages(),
        skillsAPI.getSkills()
      ]);

      setStats({
        projects: projects.length,
        testimonials: testimonials.length,
        messages: messages.length,
        skills: skills.length
      });

      // Get recent messages (last 5)
      const recent = messages.slice(0, 5);
      setRecentMessages(recent);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color = "blue" }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-${color}-100`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre portfolio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FolderOpen}
          title="Projets"
          value={stats.projects}
          color="blue"
        />
        <StatCard
          icon={Users}
          title="Témoignages"
          value={stats.testimonials}
          color="green"
        />
        <StatCard
          icon={MessageSquare}
          title="Messages"
          value={stats.messages}
          color="purple"
        />
        <StatCard
          icon={Award}
          title="Compétences"
          value={stats.skills}
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Messages Récents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message._id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{message.name}</h4>
                        <p className="text-sm text-gray-600">{message.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        message.status === 'new' 
                          ? 'bg-green-100 text-green-800' 
                          : message.status === 'read'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {message.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun message récent</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Actions Rapides</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <FolderOpen className="h-5 w-5 text-blue-600" />
                <span>Ajouter un nouveau projet</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <Users className="h-5 w-5 text-green-600" />
                <span>Ajouter un témoignage</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <Award className="h-5 w-5 text-orange-600" />
                <span>Gérer les compétences</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Voir les statistiques</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;