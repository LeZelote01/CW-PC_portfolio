import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    portfolio: 'Portfolio',
    skills: 'Compétences',
    about: 'À propos',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Rédacteur de Contenu Professionnel',
    heroSubtitle: 'Je crée du contenu engageant qui convertit vos visiteurs en clients',
    heroDescription: 'Spécialisé dans la rédaction d\'articles de blog, copywriting, contenu technique et stratégies de contenu pour PME et entreprises.',
    contactMe: 'Me Contacter',
    viewPortfolio: 'Voir le Portfolio',
    
    // About Section
    aboutTitle: 'À Propos de Moi',
    aboutDescription: 'Passionné par l\'écriture et le marketing digital, j\'aide les entreprises à développer leur présence en ligne grâce à du contenu de qualité.',
    yearsExperience: 'Années d\'Expérience',
    projectsCompleted: 'Projets Terminés',
    happyClients: 'Clients Satisfaits',
    
    // Services Section
    servicesTitle: 'Mes Services',
    blogWriting: 'Rédaction d\'Articles',
    blogDesc: 'Articles de blog optimisés SEO pour augmenter votre visibilité',
    copywriting: 'Copywriting',
    copyDesc: 'Textes persuasifs pour vos pages de vente et campagnes marketing',
    technicalWriting: 'Rédaction Technique',
    technicalDesc: 'Documentation technique claire et guides d\'utilisation',
    contentStrategy: 'Stratégie de Contenu',
    strategyDesc: 'Planification et stratégie éditoriale pour vos objectifs',
    
    // Portfolio Section
    portfolioTitle: 'Mon Portfolio',
    portfolioSubtitle: 'Découvrez mes derniers projets et réalisations',
    readMore: 'Lire Plus',
    
    // Skills Section
    skillsTitle: 'Mes Compétences',
    skillsSubtitle: 'Technologies et outils que je maîtrise',
    
    // Contact Section
    contactTitle: 'Contactez-Moi',
    contactSubtitle: 'Prêt à démarrer votre projet ? Parlons-en !',
    name: 'Nom',
    email: 'Email',
    subject: 'Sujet',
    message: 'Message',
    send: 'Envoyer',
    
    // Footer
    footerText: 'Rédacteur de contenu professionnel spécialisé dans la création de contenu engageant et optimisé.',
    quickLinks: 'Liens Rapides',
    followMe: 'Suivez-Moi',
    allRightsReserved: 'Tous droits réservés'
  },
  en: {
    // Navigation
    home: 'Home',
    portfolio: 'Portfolio',
    skills: 'Skills',
    about: 'About',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Professional Content Writer',
    heroSubtitle: 'I create engaging content that converts your visitors into clients',
    heroDescription: 'Specialized in blog writing, copywriting, technical content and content strategies for SMEs and businesses.',
    contactMe: 'Contact Me',
    viewPortfolio: 'View Portfolio',
    
    // About Section
    aboutTitle: 'About Me',
    aboutDescription: 'Passionate about writing and digital marketing, I help businesses grow their online presence through quality content.',
    yearsExperience: 'Years Experience',
    projectsCompleted: 'Projects Completed',
    happyClients: 'Happy Clients',
    
    // Services Section
    servicesTitle: 'My Services',
    blogWriting: 'Blog Writing',
    blogDesc: 'SEO-optimized blog articles to increase your visibility',
    copywriting: 'Copywriting',
    copyDesc: 'Persuasive copy for your sales pages and marketing campaigns',
    technicalWriting: 'Technical Writing',
    technicalDesc: 'Clear technical documentation and user guides',
    contentStrategy: 'Content Strategy',
    strategyDesc: 'Content planning and editorial strategy for your goals',
    
    // Portfolio Section
    portfolioTitle: 'My Portfolio',
    portfolioSubtitle: 'Discover my latest projects and achievements',
    readMore: 'Read More',
    
    // Skills Section
    skillsTitle: 'My Skills',
    skillsSubtitle: 'Technologies and tools I master',
    
    // Contact Section
    contactTitle: 'Contact Me',
    contactSubtitle: 'Ready to start your project? Let\'s talk!',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    
    // Footer
    footerText: 'Professional content writer specialized in creating engaging and optimized content.',
    quickLinks: 'Quick Links',
    followMe: 'Follow Me',
    allRightsReserved: 'All rights reserved'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};