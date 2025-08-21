# Contrats API - Portfolio Jean Yves Yao

## Vue d'ensemble du système

### Architecture
- **Frontend**: React avec contextes pour thème et langue
- **Backend**: FastAPI avec MongoDB
- **Database**: MongoDB avec collections séparées par entité
- **Admin**: Dashboard séparé pour la gestion de contenu

### Données actuellement mockées
Les données temporaires dans `/frontend/src/data/temporaryData.js` incluent :
- Profil utilisateur (profile)
- Projets (projects) 
- Compétences (skills)
- Témoignages (testimonials)
- Services (services)

## Modèles de données MongoDB

### 1. Collection `profile`
```json
{
  "_id": "ObjectId",
  "firstName": "Jean Yves",
  "lastName": "Yao", 
  "title": {
    "fr": "Rédacteur de Contenu Professionnel",
    "en": "Professional Content Writer"
  },
  "bio": {
    "fr": "Description en français",
    "en": "Description en anglais"
  },
  "email": "jeanyves.yao@email.com",
  "phone": "+33 6 12 34 56 78",
  "location": "Paris, France",
  "website": "https://jeanyves-yao.com",
  "avatar": "URL_image",
  "yearsExperience": 5,
  "projectsCompleted": 150,
  "happyClients": 80,
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### 2. Collection `projects`
```json
{
  "_id": "ObjectId",
  "title": {
    "fr": "Titre français",
    "en": "English title"
  },
  "description": {
    "fr": "Description française",
    "en": "English description"
  },
  "category": "Content Strategy | Copywriting | Technical Writing | Blog Writing",
  "client": "Nom du client",
  "duration": "Durée du projet",
  "year": 2024,
  "image": "URL_image",
  "tags": ["tag1", "tag2"],
  "results": {
    "fr": "Résultats en français",
    "en": "Results in English"
  },
  "featured": true/false,
  "published": true/false,
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### 3. Collection `skills`
```json
{
  "_id": "ObjectId",
  "name": "Nom de la compétence",
  "category": "Writing | SEO | Marketing | Strategy | Technical | Social Media",
  "level": 95, // Pourcentage
  "description": {
    "fr": "Description française",
    "en": "English description"
  },
  "order": 1, // Pour l'ordre d'affichage
  "published": true/false,
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### 4. Collection `testimonials`
```json
{
  "_id": "ObjectId",
  "name": "Nom du client",
  "position": "Poste",
  "company": "Entreprise",
  "rating": 5, // 1-5 étoiles
  "comment": {
    "fr": "Commentaire français",
    "en": "English comment"
  },
  "image": "URL_image",
  "featured": true/false,
  "published": true/false,
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### 5. Collection `services`
```json
{
  "_id": "ObjectId",
  "name": {
    "fr": "Nom français",
    "en": "English name"
  },
  "description": {
    "fr": "Description française",
    "en": "English description"
  },
  "icon": "Nom de l'icône Lucide",
  "price": "À partir de 150€",
  "features": {
    "fr": ["Feature 1", "Feature 2"],
    "en": ["Feature 1", "Feature 2"]
  },
  "order": 1,
  "published": true/false,
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### 6. Collection `messages` (Contact)
```json
{
  "_id": "ObjectId",
  "name": "Nom du contact",
  "email": "email@example.com",
  "subject": "Sujet du message",
  "message": "Contenu du message",
  "status": "new | read | replied",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

## Endpoints API Backend

### Profile endpoints
- `GET /api/profile` - Récupérer le profil
- `PUT /api/profile` - Mettre à jour le profil (admin)

### Projects endpoints  
- `GET /api/projects` - Liste des projets (published=true)
- `GET /api/projects/featured` - Projets mis en avant
- `GET /api/projects/{id}` - Détail d'un projet
- `POST /api/projects` - Créer un projet (admin)
- `PUT /api/projects/{id}` - Modifier un projet (admin)
- `DELETE /api/projects/{id}` - Supprimer un projet (admin)

### Skills endpoints
- `GET /api/skills` - Liste des compétences (published=true)
- `POST /api/skills` - Créer une compétence (admin)
- `PUT /api/skills/{id}` - Modifier une compétence (admin)
- `DELETE /api/skills/{id}` - Supprimer une compétence (admin)

### Testimonials endpoints
- `GET /api/testimonials` - Liste des témoignages (published=true)
- `GET /api/testimonials/featured` - Témoignages mis en avant
- `POST /api/testimonials` - Créer un témoignage (admin)
- `PUT /api/testimonials/{id}` - Modifier un témoignage (admin)
- `DELETE /api/testimonials/{id}` - Supprimer un témoignage (admin)

### Services endpoints
- `GET /api/services` - Liste des services (published=true)
- `POST /api/services` - Créer un service (admin)
- `PUT /api/services/{id}` - Modifier un service (admin)
- `DELETE /api/services/{id}` - Supprimer un service (admin)

### Contact endpoints
- `POST /api/contact` - Envoyer un message
- `GET /api/messages` - Liste des messages (admin)
- `PUT /api/messages/{id}/status` - Changer le status d'un message (admin)
- `DELETE /api/messages/{id}` - Supprimer un message (admin)

## Intégration Frontend-Backend

### 1. Service API (à créer)
Créer `/frontend/src/services/api.js` avec :
- Configuration axios avec base URL
- Méthodes pour chaque endpoint
- Gestion des erreurs
- Intercepteurs pour loading states

### 2. Hooks personnalisés (à créer)
- `useProfile()` - Pour récupérer et cacher le profil
- `useProjects()` - Pour les projets avec filtres
- `useSkills()` - Pour les compétences par catégorie
- `useTestimonials()` - Pour les témoignages
- `useServices()` - Pour les services
- `useContact()` - Pour l'envoi de messages

### 3. Modifications à apporter
- Remplacer les imports de `temporaryData.js` par les hooks
- Ajouter les états de loading/error dans les composants
- Implémenter la gestion d'erreur avec toast notifications
- Optimiser avec React Query ou SWR pour la cache

## Dashboard d'Administration

### Features requises
1. **Authentification simple** (login/logout)
2. **Gestion du profil** (édition complète)
3. **Gestion des projets** (CRUD complet + upload images)
4. **Gestion des compétences** (CRUD avec drag & drop pour l'ordre)
5. **Gestion des témoignages** (CRUD + modération)
6. **Gestion des services** (CRUD + tarification)
7. **Messages de contact** (lecture, réponse, archivage)
8. **Analytics simples** (vues, messages, projets populaires)

### Structure du dashboard
- Route séparée `/admin` 
- Composants réutilisables pour les formulaires
- Tables avec pagination et recherche
- Upload d'images avec prévisualisation
- Éditeur de texte riche pour les descriptions

## Déploiement Netlify

### Frontend principal (Portfolio)
- Build : `yarn build`  
- Publish directory : `build`
- Redirects : `_redirects` pour SPA routing
- Environment variables : `REACT_APP_BACKEND_URL`

### Frontend admin (Dashboard)
- Build séparé dans `/admin`
- Même configuration Netlify
- URL distincte (ex: admin.jeanyves-yao.com)

### Configuration requise
1. **Variables d'environnement**
   - `REACT_APP_BACKEND_URL` (URL de l'API backend)
   
2. **Fichier `_redirects`**
   ```
   /*    /index.html   200
   ```

3. **Build commands**
   - Portfolio : `yarn build`
   - Admin : `cd admin && yarn build`

## Prochaines étapes d'implémentation

1. **Backend** : Créer les modèles et endpoints API
2. **Frontend** : Intégrer les appels API et remplacer les données mockées  
3. **Dashboard** : Créer l'interface d'administration
4. **Tests** : Tester l'ensemble du workflow
5. **Déploiement** : Configuration Netlify

Cette approche garantit une séparation claire entre les préoccupations et permet une gestion efficace du contenu via le dashboard d'administration.