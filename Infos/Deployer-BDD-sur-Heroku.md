# Deployer la base de données sur Heroku

## Prérequis

- avoir un compte (Heroku ne sera plus gratuit à partir du 28 nov. 2022)
- avoir installé [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli) en global

## Créer une app Heroku

- cliquer sur `create app` et suivre le processus de création en ajoutant :
  - un buildpack nodejs (dans `settings`)
  - un add-on Postgres (dans `Resources`)

- mettre à jour les données d'environnement dans le fichier `.env`. 

  *Pour les trouver, aller sur le suivi de l'app dans votre compte Heroku, cliquer sur `settings`, descendre jusqu'à la partie `Config Vars` et cliquer sur "reveal vars". Il suffit de copier la valeur associée à la clée `DATABASE_URL` 😉.*

- se déplacer dans le dossier server dans le terminal et suivre la [procédure de déploiement avec git](https://devcenter.heroku.com/articles/git) : l'application a maintenant 2 suivis `git` (à la racine, le code qui va sur Github, dans le dossier server le code qui va sur Heroku - uniquement la partie serveur).

## Paramétrer la partie client pour qu'elle communique avec l'API

- Modifier l'URL des fetch en lignes 305 et 329 du fichier client/app.js pour que ça corresponde à l'adresse de votre app Heroku.