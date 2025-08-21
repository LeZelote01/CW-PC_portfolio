import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile, useFeaturedProjects, useServices, useFeaturedTestimonials } from '../hooks/usePortfolioData';
import { LoadingSpinner, ErrorMessage } from '../components/common/LoadingState';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const { t, language } = useLanguage();
  
  // Fetch data from API
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { projects, loading: projectsLoading, error: projectsError } = useFeaturedProjects();
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useFeaturedTestimonials();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                {profileLoading ? (
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                ) : profileError ? (
                  <ErrorMessage error={profileError} />
                ) : profile ? (
                  <>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                      {profile.title[language]}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('heroSubtitle')}
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {profile.bio[language]}
                    </p>
                  </>
                ) : null}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link to="/contact">
                    {t('contactMe')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/portfolio">
                    {t('viewPortfolio')}
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              {profile && (
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {profile.years_experience}+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('yearsExperience')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {profile.projects_completed}+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('projectsCompleted')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {profile.happy_clients}+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('happyClients')}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              {profile && (
                <>
                  <div className="relative z-10">
                    <img
                      src={profile.avatar}
                      alt={`${profile.first_name} ${profile.last_name}`}
                      className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-400/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('servicesTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Services professionnels de rédaction pour faire croître votre entreprise
            </p>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                    </div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : servicesError ? (
            <ErrorMessage error={servicesError} />
          ) : services ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200 dark:hover:border-green-800">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 bg-green-600 rounded"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.name[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description[language]}
                    </p>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {service.price}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Projets Récents
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez quelques-uns de mes projets les plus réussis
            </p>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg space-y-4">
                    <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : projectsError ? (
            <ErrorMessage error={projectsError} />
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title[language]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-500">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {project.description[language]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{project.client}</span>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        {t('readMore')} <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">
                Voir tous les projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ce que disent mes clients
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Témoignages de clients satisfaits de mes services de rédaction
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white dark:bg-gray-900 border rounded-lg p-6 space-y-4">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonialsError ? (
            <ErrorMessage error={testimonialsError} />
          ) : testimonials ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="relative">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                      "{testimonial.comment[language]}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à faire passer votre contenu au niveau supérieur ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Travaillons ensemble pour créer du contenu qui engage votre audience et fait croître votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Démarrer un Projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link to="/portfolio">
                Voir le Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;