# Deployer la base de données sur Render

## Prérequis

- avoir un compte (gratuit)


## Déployer une API Node Express sur Render

- cliquer sur `New +` et suivre le processus de création en ajoutant un Web service puis : 
  - se connecter à son repo GitHub
  - renseigner les informations demandées dont :
    - Environnement : `Node`
    - Root Directory : `server`
    - Build command : `npm install`
    - Start Command : `npm start`
  - choisir le plan `Free` 

Dans le dashboard du Web service, se rendre sur Environment et ajouter le fichier `.env` aux `Secret Files`


## Paramétrer la partie client pour qu'elle communique avec l'API

- Modifier l'URL des fetch en lignes 305 et 329 du fichier client/app.js pour que ça corresponde à l'adresse de votre app Heroku.

## Créer une base de données sur Render

- cliquer sur `New +` , choisir `Postgresql` et suivre le processus de création
- mettre à jour les données d'environnement dans le fichier `.env`. 

  *Pour les trouver, aller sur le suivi de la BDD dans votre compte Render, cliquer sur `Info`, descendre jusqu'à la partie `Connections` et cliquer sur "reveal vars". Il suffit de copier la valeur associée à la clée `External Database URL` si vous voulez y accéder depuis un line externe (sur votre hôte par exemple) ou `Internal Database URL` si c'est pour l'ajouter au `.env` de l'API sur Render 😉.*

- copier la `PSQL Command` qui permet de se connecter à la DB depuis le terminal
- Dans le terminal :
  - éxecuter la commande qui vient d'être copiée pour se connecter à la base de données
  - générer la table : ` \i server/data/create_table.sql` 
  - :tada:  