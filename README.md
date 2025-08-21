# Portfolio Jean Yves Yao

Portfolio personnel de Jean Yves Yao - Rédacteur de Contenu Professionnel.

## 🚀 Déploiement sur Netlify

### Méthode 1: Déploiement automatique depuis GitHub

1. **Connectez votre repository GitHub à Netlify**:
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Connectez votre compte GitHub
   - Sélectionnez ce repository

2. **Configuration du build**:
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
   - Base directory: `frontend/`

3. **Variables d'environnement**:
   Dans les paramètres Netlify > Environment variables, ajoutez:
   ```
   REACT_APP_BACKEND_URL=https://votre-backend-api.com
   ```

### Méthode 2: Déploiement manuel

1. **Installer Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build le projet**:
   ```bash
   cd frontend
   yarn install
   yarn build
   ```

3. **Déployer**:
   ```bash
   # Premier déploiement (preview)
   yarn preview
   
   # Déploiement en production
   yarn deploy
   ```

## 🛠️ Installation locale

1. **Cloner le repository**:
   ```bash
   git clone <votre-repo-url>
   cd portfolio-jean-yves
   ```

2. **Installation des dépendances**:
   ```bash
   cd frontend
   yarn install
   ```

3. **Configuration de l'environnement**:
   ```bash
   cp .env.example .env
   # Éditez .env avec vos configurations
   ```

4. **Démarrer le serveur de développement**:
   ```bash
   yarn start
   ```

## 📁 Structure du projet

```
portfolio-jean-yves/
├── frontend/                 # Application React
│   ├── public/              # Fichiers statiques
│   ├── src/                 # Code source
│   │   ├── components/      # Composants React
│   │   ├── pages/          # Pages de l'application
│   │   ├── hooks/          # Hooks personnalisés
│   │   └── contexts/       # Contextes React
│   ├── package.json        # Dépendances frontend
│   └── .env                # Variables d'environnement
├── backend/                 # API FastAPI (optionnel)
├── netlify.toml            # Configuration Netlify
└── README.md               # Ce fichier
```

## 🔧 Backend API (Optionnel)

Pour utiliser les fonctionnalités backend (contact, etc.), vous devez déployer l'API FastAPI séparément:

### Options de déploiement backend:
- **Heroku**: Simple et gratuit pour débuter
- **Railway**: Modern et facile à utiliser
- **DigitalOcean App Platform**: Performant et abordable
- **Vercel**: Avec des fonctions serverless

### Configuration backend:
1. Déployez votre API backend sur la plateforme choisie
2. Obtenez l'URL de votre API
3. Configurez `REACT_APP_BACKEND_URL` dans Netlify avec cette URL

## 🎨 Personnalisation

### Modifier les informations personnelles:
1. Éditez `/backend/seed_data.py` pour vos informations
2. Modifiez les textes dans `/frontend/src/pages/`
3. Remplacez les images dans `/frontend/public/`

### Modifier le design:
- Les styles sont dans `/frontend/src/index.css`
- Configuration Tailwind dans `/frontend/tailwind.config.js`
- Composants UI dans `/frontend/src/components/ui/`

## 📱 Fonctionnalités

- ✅ Portfolio responsive
- ✅ Mode sombre/clair
- ✅ Multilingue (FR/EN)
- ✅ Formulaire de contact
- ✅ Affichage des projets
- ✅ Section compétences
- ✅ Témoignages clients
- ✅ SEO optimisé

## 🚀 Technologies utilisées

- **Frontend**: React 19, Tailwind CSS, Radix UI
- **Backend**: FastAPI, MongoDB (optionnel)
- **Déploiement**: Netlify (frontend)
- **Icons**: Lucide React
- **Formulaires**: React Hook Form

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

## 🤝 Support

Si vous avez des questions ou besoin d'aide:
- Créez une issue sur GitHub
- Contactez Jean Yves Yao: jeanyves.yao@email.com

---

**Happy coding! 🎉**
