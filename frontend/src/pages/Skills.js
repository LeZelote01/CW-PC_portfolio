import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioData } from '../data/temporaryData';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

const Skills = () => {
  const { t, language } = useLanguage();
  const { skills } = portfolioData;

  const skillCategories = [...new Set(skills.map(skill => skill.category))];

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  const categoryColors = {
    'Writing': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'SEO': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'Strategy': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'Technical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'Social Media': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('skillsTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('skillsSubtitle')}
          </p>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <Card key={skill.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200 dark:hover:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <Badge className={categoryColors[skill.category] || categoryColors.Writing}>
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Progress value={skill.level} className="h-2" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {skill.description[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Compétences par Catégorie
          </h2>
          
          <div className="space-y-12">
            {skillCategories.map((category) => {
              const categorySkills = getSkillsByCategory(category);
              return (
                <div key={category} className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Badge className={`${categoryColors[category] || categoryColors.Writing} px-3 py-1`}>
                      {category}
                    </Badge>
                    <span className="text-lg text-gray-500">({categorySkills.length} compétence{categorySkills.length > 1 ? 's' : ''})</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </h4>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <Progress value={skill.level} className="h-3 mb-3" />
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {skill.description[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Skills Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Outils et Technologies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Outils de Rédaction
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Google Docs</Badge>
                  <Badge variant="secondary">Notion</Badge>
                  <Badge variant="secondary">Grammarly</Badge>
                  <Badge variant="secondary">Hemingway</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  SEO & Analytics
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">SEMrush</Badge>
                  <Badge variant="secondary">Ahrefs</Badge>
                  <Badge variant="secondary">Google Analytics</Badge>
                  <Badge variant="secondary">Yoast SEO</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Gestion de Projet
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Trello</Badge>
                  <Badge variant="secondary">Asana</Badge>
                  <Badge variant="secondary">Monday</Badge>
                  <Badge variant="secondary">Slack</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;