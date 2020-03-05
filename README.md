# AppListRecipes

![CI](https://github.com/dany-sanchez/AppListRecipes/workflows/CI/badge.svg?branch=master)

Projet de développement mobile réalisé en react native

## Premier lancement :

Installer **Node.js** (LTS).

Installer **les dépendances** du projet :
```
npm install
```

Installer **Expo** en global :
```
npm install -g expo-cli
```

Installer **l'application Expo** sur tablette/smartphone.

Avant de démarrer, résoudre les éventuelles erreurs.

## Fix

Après installation des dépendances, corriger dans le fichier *\node_modules\metro-config\src\defaults\blacklist.js*

```
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```

A changer en :

```
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```

## Démarrage

Lancer la commande ``` expo start ``` ou ``` npm start ``` pour démarrer.

## Télécharger

L'APK est disponible au téléchargement dans la dernière [release](https://github.com/dany-sanchez/AppListRecipes/releases/latest) du projet.
