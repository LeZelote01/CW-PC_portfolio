import React, { useState } from 'react';
import { ArrowRight, Calendar, User, ExternalLink, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../hooks/usePortfolioData';
import { LoadingSpinner, ErrorMessage } from '../components/common/LoadingState';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Fetch projects from API
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  const categories = ['All', 'Content Strategy', 'Copywriting', 'Technical Writing', 'Blog Writing'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Loading and error states
  if (projectsLoading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('portfolioTitle')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('portfolioSubtitle')}
            </p>
          </div>
        </section>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <LoadingSpinner />
          </div>
        </section>
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="min-h-screen pt-20">
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('portfolioTitle')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('portfolioSubtitle')}
            </p>
          </div>
        </section>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <ErrorMessage error={projectsError} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('portfolioTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('portfolioSubtitle')}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category === 'All' ? 'Tous' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
              <Card key={project.id} className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-8'}`}>
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image}
                    alt={project.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {project.client}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {project.title[language]}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description[language]}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Résultats:</span>
                    </div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {project.results[language]}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Durée: {project.duration}
                    </span>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 group-hover:translate-x-1 transition-transform duration-300">
                      {t('readMore')} 
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Aucun projet trouvé pour cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vous avez un projet en tête ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs avec du contenu de qualité.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="/contact">
              Démarrer un Projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;