# efrei_graphql_socialnet
Projet efrei de création d'un mini réseau social pour découvrir graphql

# Serveur GraphQL

## Installation

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Configurer la base de données dans `.env`
4. Exécuter les migrations : `npx prisma migrate dev`
5. Démarrer le serveur : `npm run dev`

## Utilisation

- Mutation `register` : Inscrire un nouvel utilisateur
- Mutation `login` : Connecter un utilisateur
- Query `me` : Récupérer les informations de l'utilisateur connecté
