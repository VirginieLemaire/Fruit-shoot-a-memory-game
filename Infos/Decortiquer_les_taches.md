# Décortiquer un challenge ou un nouveau projet

Voici le processus que j'utilise pour suivre un challenge ou un mini projet.

## Etapes

### 1. Se préparer

- Lire les consignes une fois en entier puis les décortiquer
- Se préparer une to-do list respectant ce qui est demandé dans les consignes : ça aide à se focaliser sur les étapes et à ne rien oublier
- Découper en plusieurs étapes
- Commencer par écrire ce qu'il faut faire pour chaque étape en "français dans le texte" ou en pseudo-code (je le fais dans un fichier à part pour "coucher mes réflexions", parfois directement dans le code pour ne pas oublier une étape à prévoir 😉)
- Effectuer des recherches si besoin, relire des cours, retourner voir d'anciens challenges qui pourraient nous servir ...
- Décider des technos utilisées (si elles ne sont pas indiquées dans le challenge)

### 2. Coder

- Mettre en place une version statique
- Initier une mise en forme grossière de l'application pour bien visualiser les blocs et leur mise en place
- Finaliser la mise en forme
- Commencer à dynamiser petit à petit
- Continuer à développer en vérifiant régulièrement qu'on n'oublie rien
- S'amuser 😎

## Décortiquer les consignes

Décortiquer les consignes aide à bien cerner ce qui est attendu et permettra de se fixer des étapes pour le développement de l'application : ça rend l'ensemble du projet moins compliqué 😉

💡 C'est également parfois en prenant le temps de lire les consignes jusqu'au bout et en les notant qu'on se rend compte qu'une information utile au début du projet se trouve en fin de consignes ! Ca serait dommage de s'en rendre compte après plusieurs heures de travail...

Cela sera aussi utile pour écrire le fichier Readme 😉

### De quoi s'agit-il?

Il s'agit de développer un petit jeu de memory (mini-projet) en commentant le code de manière à ce que ça puisse servir de tuto / guide / support de révision ...

**Objectif du jeu** : trouver toutes les paires d'un jeu de cartes représentant des fruits avant le temps imparti.

### Fonctionnalités

Comme j'aime cocher des cases pour valider mon avancée, je crée ma liste sous forme de to-do list. C'est bien sûr facultatif !

Début du jeu : 
- [x] Les cartes sont face cachée sur le plateau
- [x] Avant le début du jeu les meilleurs temps sont affichés à l'écran (à ajouter lorsque les temps seront enregistrés)

Partie en cours :

- [x] Le joueur clique sur 2 cartes, ce qui les retourne :
  - [x] si elles sont identiques = la paire est validée, 
  - [x] sinon -> les cartes sont retournées
- [x] Il y a un compteur de temps comme suit :
  - [x] une barre de progession
  - [x] elle est affichée en dessous du plateau

Fin de la partie :

- [x] Si toutes les paires sont trouvées c'est gagné !
- [x] Le temps de partie est sauvegardé en base de données
- [x] Afficher un message indiquant si le joueur a gagné ou perdu



