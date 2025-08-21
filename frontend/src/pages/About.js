import React from 'react';
import { Download, Award, Users, Clock, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioData } from '../data/temporaryData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

const About = () => {
  const { t, language } = useLanguage();
  const { profile, testimonials } = portfolioData;

  const experiences = [
    {
      id: 1,
      title: {
        fr: 'Rédacteur de Contenu Senior',
        en: 'Senior Content Writer'
      },
      company: 'Freelance',
      period: '2021 - Présent',
      description: {
        fr: 'Spécialisé dans la création de contenu pour PME et startups tech. Développement de stratégies éditoriales complètes.',
        en: 'Specialized in content creation for SMEs and tech startups. Development of comprehensive editorial strategies.'
      }
    },
    {
      id: 2,
      title: {
        fr: 'Copywriter Marketing',
        en: 'Marketing Copywriter'
      },
      company: 'Digital Agency Pro',
      period: '2019 - 2021',
      description: {
        fr: 'Création de campagnes publicitaires et de contenu marketing pour des clients B2B et B2C.',
        en: 'Creation of advertising campaigns and marketing content for B2B and B2C clients.'
      }
    },
    {
      id: 3,
      title: {
        fr: 'Rédacteur Web Junior',
        en: 'Junior Web Writer'
      },
      company: 'Content Solutions',
      period: '2018 - 2019',
      description: {
        fr: 'Rédaction d\'articles de blog et de contenu web optimisé SEO pour diverses industries.',
        en: 'Writing blog articles and SEO-optimized web content for various industries.'
      }
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Certification Google Analytics',
      year: '2023',
      description: 'Analyse avancée des performances de contenu'
    },
    {
      id: 2,
      title: 'Formation SEO Avancé',
      year: '2022',
      description: 'Optimisation de contenu pour les moteurs de recherche'
    },
    {
      id: 3,
      title: 'Certification Copywriting',
      year: '2021',
      description: 'Techniques de persuasion et de conversion'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {t('aboutTitle')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {profile.bio[language]}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger CV
                </Button>
                <Button variant="outline" size="lg">
                  Me Contacter
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={profile.avatar}
                alt="Jean Yves Yao"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">{profile.yearsExperience}+</div>
                  <div className="text-sm">Années d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {profile.yearsExperience}+
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t('yearsExperience')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {profile.projectsCompleted}+
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t('projectsCompleted')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {profile.happyClients}+
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t('happyClients')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Expérience Professionnelle
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-800"></div>
              
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                  
                  <div className="ml-20">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exp.title[language]}
                          </h3>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3">
                          {exp.company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {exp.description[language]}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Certifications & Formations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {achievement.year}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Informations Personnelles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Coordonnées
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                      <p className="text-gray-900 dark:text-white">{profile.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Téléphone:</span>
                      <p className="text-gray-900 dark:text-white">{profile.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Localisation:</span>
                      <p className="text-gray-900 dark:text-white">{profile.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Langues
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-900 dark:text-white">Français</span>
                        <span className="text-gray-600 dark:text-gray-400">Natif</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-900 dark:text-white">Anglais</span>
                        <span className="text-gray-600 dark:text-gray-400">Professionnel</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;