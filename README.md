# efrei_graphql_socialnet
Projet efrei de création d'un mini réseau social pour découvrir graphql

# Serveur GraphQL

## Installation

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Exécuter les migrations : `npx prisma migrate dev`
4. Démarrer le serveur : `npm run dev`

## Utilisation

- Mutation `register` : Inscrire un nouvel utilisateur
- Mutation `login` : Connecter un utilisateur
- Query `me` : Récupérer les informations de l'utilisateur connecté


# Back-End

## Installation

1. Installer les dépendances : `npm install`
2. Configurer la base de données dans `.env` 
  A creer dans apolloserv :
  DATABASE_URL="file:./db.sqlite"
  JWT_SECRET=secret
3. Démarrer le serveur : `npm run dev`


# Front-End

## Installation

1. Installer les dépendances : `npm install`
2. Démarrer le front-end : `npm run dev`
3. Creer un compte dans le register
