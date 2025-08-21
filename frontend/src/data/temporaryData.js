// Données temporaires qui seront remplacées par la base de données
export const portfolioData = {
  profile: {
    id: 1,
    firstName: 'Jean Yves',
    lastName: 'Yao',
    title: 'Rédacteur de Contenu Professionnel',
    bio: {
      fr: 'Passionné par l\'écriture et le marketing digital, j\'aide les entreprises à développer leur présence en ligne grâce à du contenu de qualité. Avec plus de 5 ans d\'expérience, je me spécialise dans la création de contenu engageant qui convertit.',
      en: 'Passionate about writing and digital marketing, I help businesses grow their online presence through quality content. With over 5 years of experience, I specialize in creating engaging content that converts.'
    },
    email: 'jeanyves.yao@email.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    website: 'https://jeanyves-yao.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    yearsExperience: 5,
    projectsCompleted: 150,
    happyClients: 80
  },

  projects: [
    {
      id: 1,
      title: {
        fr: 'Stratégie de Contenu E-commerce',
        en: 'E-commerce Content Strategy'
      },
      description: {
        fr: 'Développement d\'une stratégie de contenu complète pour une boutique en ligne, incluant descriptions produits, blog et réseaux sociaux.',
        en: 'Development of a comprehensive content strategy for an online store, including product descriptions, blog and social media.'
      },
      category: 'Content Strategy',
      client: 'TechStore Online',
      duration: '3 mois',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['SEO', 'E-commerce', 'Content Strategy', 'Blog Writing'],
      results: {
        fr: '+150% de trafic organique, +75% de conversions',
        en: '+150% organic traffic, +75% conversions'
      }
    },
    {
      id: 2,
      title: {
        fr: 'Campagne de Copywriting SaaS',
        en: 'SaaS Copywriting Campaign'
      },
      description: {
        fr: 'Création de pages de vente, emails marketing et contenu publicitaire pour le lancement d\'un logiciel SaaS B2B.',
        en: 'Creation of sales pages, marketing emails and advertising content for the launch of a B2B SaaS software.'
      },
      category: 'Copywriting',
      client: 'DataFlow Solutions',
      duration: '2 mois',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['Copywriting', 'SaaS', 'Email Marketing', 'Landing Pages'],
      results: {
        fr: '+200% de leads qualifiés, 35% de taux de conversion',
        en: '+200% qualified leads, 35% conversion rate'
      }
    },
    {
      id: 3,
      title: {
        fr: 'Documentation Technique API',
        en: 'API Technical Documentation'
      },
      description: {
        fr: 'Rédaction de documentation technique complète pour une API REST, incluant guides d\'intégration et exemples de code.',
        en: 'Writing comprehensive technical documentation for a REST API, including integration guides and code examples.'
      },
      category: 'Technical Writing',
      client: 'DevTools Inc.',
      duration: '4 semaines',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      tags: ['Technical Writing', 'API', 'Documentation', 'Developer Tools'],
      results: {
        fr: '90% de réduction des tickets support, documentation adoptée par 500+ développeurs',
        en: '90% reduction in support tickets, documentation adopted by 500+ developers'
      }
    },
    {
      id: 4,
      title: {
        fr: 'Blog Corporate B2B',
        en: 'Corporate B2B Blog'
      },
      description: {
        fr: 'Création et gestion éditoriale d\'un blog corporate, avec 2 articles par semaine sur les tendances du marché.',
        en: 'Creation and editorial management of a corporate blog, with 2 articles per week on market trends.'
      },
      category: 'Blog Writing',
      client: 'FinanceHub Pro',
      duration: '6 mois',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      tags: ['Blog Writing', 'SEO', 'B2B', 'Financial Services'],
      results: {
        fr: '+300% de trafic organique, positionnement sur 50+ mots-clés',
        en: '+300% organic traffic, ranking on 50+ keywords'
      }
    }
  ],

  skills: [
    {
      id: 1,
      name: 'Rédaction Web',
      category: 'Writing',
      level: 95,
      description: {
        fr: 'Création de contenu web optimisé pour le référencement et l\'engagement',
        en: 'Creating web content optimized for SEO and engagement'
      }
    },
    {
      id: 2,
      name: 'SEO Writing',
      category: 'SEO',
      level: 90,
      description: {
        fr: 'Optimisation du contenu pour les moteurs de recherche',
        en: 'Content optimization for search engines'
      }
    },
    {
      id: 3,
      name: 'Copywriting',
      category: 'Marketing',
      level: 88,
      description: {
        fr: 'Rédaction persuasive pour la conversion et les ventes',
        en: 'Persuasive writing for conversion and sales'
      }
    },
    {
      id: 4,
      name: 'Content Strategy',
      category: 'Strategy',
      level: 85,
      description: {
        fr: 'Planification et stratégie éditoriale',
        en: 'Editorial planning and strategy'
      }
    },
    {
      id: 5,
      name: 'Technical Writing',
      category: 'Technical',
      level: 82,
      description: {
        fr: 'Documentation technique et guides utilisateur',
        en: 'Technical documentation and user guides'
      }
    },
    {
      id: 6,
      name: 'Social Media Content',
      category: 'Social Media',
      level: 87,
      description: {
        fr: 'Contenu adapté aux réseaux sociaux',
        en: 'Content adapted for social media'
      }
    }
  ],

  testimonials: [
    {
      id: 1,
      name: 'Marie Dubois',
      position: 'Marketing Director',
      company: 'TechStore Online',
      rating: 5,
      comment: {
        fr: 'Jean Yves a transformé notre stratégie de contenu. Nos ventes ont augmenté de 75% en 3 mois grâce à son travail exceptionnel.',
        en: 'Jean Yves transformed our content strategy. Our sales increased by 75% in 3 months thanks to his exceptional work.'
      },
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      position: 'CEO',
      company: 'DataFlow Solutions',
      rating: 5,
      comment: {
        fr: 'Un professionnel hors pair ! Sa capacité à comprendre nos besoins techniques et à les traduire en contenu accessible est remarquable.',
        en: 'An outstanding professional! His ability to understand our technical needs and translate them into accessible content is remarkable.'
      },
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Sophie Chen',
      position: 'Product Manager',
      company: 'DevTools Inc.',
      rating: 5,
      comment: {
        fr: 'La documentation créée par Jean Yves a révolutionné l\'expérience de nos développeurs. Travail impeccable et livraisons toujours à temps.',
        en: 'The documentation created by Jean Yves revolutionized our developers\' experience. Impeccable work and always delivered on time.'
      },
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ],

  services: [
    {
      id: 1,
      name: {
        fr: 'Rédaction d\'Articles',
        en: 'Blog Writing'
      },
      description: {
        fr: 'Articles de blog optimisés SEO pour augmenter votre visibilité et générer du trafic qualifié.',
        en: 'SEO-optimized blog articles to increase your visibility and generate qualified traffic.'
      },
      icon: 'PenTool',
      price: 'À partir de 150€',
      features: {
        fr: ['Recherche de mots-clés', 'Optimisation SEO', 'Images incluses', 'Révisions illimitées'],
        en: ['Keyword research', 'SEO optimization', 'Images included', 'Unlimited revisions']
      }
    },
    {
      id: 2,
      name: {
        fr: 'Copywriting',
        en: 'Copywriting'
      },
      description: {
        fr: 'Textes persuasifs pour vos pages de vente, campagnes email et publicités.',
        en: 'Persuasive copy for your sales pages, email campaigns and advertisements.'
      },
      icon: 'Target',
      price: 'À partir de 300€',
      features: {
        fr: ['Pages de vente', 'Emails marketing', 'Publicités', 'Tests A/B'],
        en: ['Sales pages', 'Marketing emails', 'Advertisements', 'A/B testing']
      }
    },
    {
      id: 3,
      name: {
        fr: 'Rédaction Technique',
        en: 'Technical Writing'
      },
      description: {
        fr: 'Documentation technique claire, guides d\'utilisation et manuels utilisateur.',
        en: 'Clear technical documentation, user guides and user manuals.'
      },
      icon: 'FileText',
      price: 'À partir de 200€',
      features: {
        fr: ['Documentation API', 'Guides utilisateur', 'Manuels techniques', 'Support développeur'],
        en: ['API documentation', 'User guides', 'Technical manuals', 'Developer support']
      }
    },
    {
      id: 4,
      name: {
        fr: 'Stratégie de Contenu',
        en: 'Content Strategy'
      },
      description: {
        fr: 'Planification et stratégie éditoriale complète pour atteindre vos objectifs.',
        en: 'Complete editorial planning and strategy to achieve your goals.'
      },
      icon: 'TrendingUp',
      price: 'À partir de 500€',
      features: {
        fr: ['Audit de contenu', 'Calendrier éditorial', 'Personas', 'Métriques et suivi'],
        en: ['Content audit', 'Editorial calendar', 'Personas', 'Metrics and tracking']
      }
    }
  ]
};