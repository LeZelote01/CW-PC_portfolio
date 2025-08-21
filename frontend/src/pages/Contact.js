import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile, useContact } from '../hooks/usePortfolioData';
import { LoadingSpinner, ErrorMessage } from '../components/common/LoadingState';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { t, language } = useLanguage();
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { sendMessage, loading: sendingMessage, error: sendError, success } = useContact();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await sendMessage(formData);
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = profile ? [
    {
      icon: Mail,
      title: 'Email',
      content: profile.email,
      description: 'Réponse sous 24h',
      link: `mailto:${profile.email}`
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: profile.phone,
      description: 'Lun-Ven 9h-18h',
      link: `tel:${profile.phone}`
    },
    {
      icon: MapPin,
      title: 'Localisation',
      content: profile.location,
      description: 'Télétravail disponible',
      link: '#'
    }
  ] : [];

  const services = [
    'Rédaction d\'articles de blog',
    'Copywriting et pages de vente',
    'Documentation technique',
    'Stratégie de contenu',
    'Optimisation SEO',
    'Contenu réseaux sociaux'
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('contactTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {profileLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : profileError ? (
            <ErrorMessage error={profileError} />
          ) : profile ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="space-y-4">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                        <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {info.title}
                      </h3>
                      <p className="text-lg text-gray-900 dark:text-white font-medium">
                        {info.content}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {info.description}
                      </p>
                      {info.link !== '#' && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={info.link}>Contacter</a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      {/* Contact Form & Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Envoyez-moi un message
                </h2>
                
                {success && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center text-green-700 dark:text-green-300">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Message envoyé avec succès !</span>
                    </div>
                  </div>
                )}
                
                {sendError && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center text-red-700 dark:text-red-300">
                      <span className="font-medium">Erreur : {sendError}</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom complet"
                        disabled={sendingMessage}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre@email.com"
                        disabled={sendingMessage}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('subject')} *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Sujet de votre message"
                      disabled={sendingMessage}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre projet ou vos besoins..."
                      rows={6}
                      disabled={sendingMessage}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={sendingMessage}
                  >
                    {sendingMessage ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('send')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Services & Availability */}
            <div className="space-y-8">
              {/* Services */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Mes Services
                  </h3>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Disponibilité
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Réponse rapide
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Je réponds généralement sous 24h
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Nouveaux projets acceptés
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Planning disponible pour janvier 2025
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Télétravail et rendez-vous
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Flexible selon vos préférences
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Questions Fréquentes
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Quels sont vos tarifs ?
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Les tarifs varient selon le projet. Contactez-moi pour un devis personnalisé.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Quels délais de livraison ?
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Généralement 1-2 semaines selon la complexité du projet.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Révisions incluses ?
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Oui, les révisions sont incluses jusqu'à satisfaction complète.
                      </p>
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

export default Contact;