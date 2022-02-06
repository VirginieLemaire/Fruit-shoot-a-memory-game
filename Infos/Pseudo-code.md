# Liste des étapes pour mettre en place l'application, réflexions et pseudo-code

## I. Mettre en place une version statique

- [X] Créer une page HTML statique
- [x] Créer une mise en page grossière pour visualiser les différents éléments et les placer
- [x] Finaliser le design pour qu'il corresponde aux exemples, sinon adapter selon ses goûts 🖌️ (c'est au choix).

<details><summary>Astuce barre de progression 🪄</summary>

Pour créer une barre de progession toute simple (ou ici un timer) on peut créer une `div` à l'intérieur de laquelle on ajoute un `span`. Il faudra ensuite jouer avec les hauteurs et largeurs 😉

</details>

## II. Dynamiser l'application en modifiant le DOM et en ajoutant les cartes

Une page HTML c'est bien mais il y a beaucoup de répétitions pour créer le plateau de jeu 🤔. En plus on va vouloir ajouter des cartes aléatoirement 🤯. Jouons avec JS !

- [x] Commencer par ajouter les différents éléments des cartes au DOM plutôt que de le faire en dur en HTML :
  - récupérer l'élément parent
  - créer un nouvel élément
  - rattacher le nouvel élement sur le parent

### II.1 Placer un image sur la face cachée

- [x] Au clic sur une carte, changer sa classe (une classe pour la face cachée, une classe pour la face avec image).
  - Placer un écouteur d'évènement sur les cartes (on récupère la liste des cartes via le DOM et on boucle dessus)
  - Au déclenchement de l'évènement, modifier la classe avec une nouvelle classe (par exemple `board__card--selected`) en utilisant [`toggle`](https://developer.mozilla.org/fr/docs/Web/API/DOMTokenList/toggle)
- [x] Sur cette seconde classe, placer l'image du premier fruit (on aura partout le même fruit à ce stade, ce n'est pas grave, on y va par étapes 🐢)
- [x] Changer l'image du fruit pour afficher la seconde image histoire de jouer avec les [sprites](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS)

### II.2 Placer une image aléatoire

Il faut faire en sorte que l'image de fruit soit choisie au hasard. Pour l'instant, on continue à placer le fruit choisi sur toutes les cellules.
- [x] Créer une fonction permettant de trouver un nombre aléatoire parmi le nombre de fruits représentés dans le sprite
- [x] ajouter une propriété CSS pour décaler la position de l'image

*Nombre aléatoire : [`Math.random()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random), [`Math.floor()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)*

### II.3 La placer sur une case aléatoire

Maintenant qu'on sait peut choisir une image au hasard, on va la positionner au hasard. Il va aussi falloir s'assurer que chaque carte est présente en double (pas moins, pas plus...)

- [x] on va stocker  les numéros de fruits tirés au sort dans un tableau ce qui va permettre de ...
- [x] ... vérifier que ce numéro n'a pas déjà été tiré au sort
- [x] si c'est ok, on le stocke (2X pour avoir la paire)
- [x] sinon, on retourne les cartes en jouant à nouveau avec les classes
- [x] enfin, mélanger les données du tableau

#### II.3.1 Positionner une carte de fruit au hasard

- [x] Pour retrouver plus tard les correspondances cellule/fruit, ça serait une bonne idée d'ajouter un identiant sur chaque carte 😉

Grâce au tableau des fruits tirés au sort et mélangés on n'a plus qu'à :

- [x] boucler sur les cellules pour associer une cellule avec un fruit
- [x] on stocke ces infos dans un tableau d'objet contenant l'id de la cellule et le numéro du fruit 👍

#### II.3.1 S'assurer qu'on affiche des paires

L'idée est de stocker provisoirement les infos correspondant aux cartes cliquées, toute les 2 cartes pour pouvoir effectuer des comparaisons ensuite.
- [x] stocker l'id de la cellule cliquée (pour les correspondances id / fruit)
- [x] stocker l'élément pour pouvoir jouer avec le DOM (supprimer la classe)

## III. Comparer les cartes cliquées

- [x] préparer une condition qui s'exécute dès que 2 cartes ont été sélectionnées :
- [x] s'il y a 2 cartes dans le tableau qu'on vient de créer, on les compare (rappel : on a un tableau d'objet contenant l'id de la cellule et le numéro du fruit 😉)
- [x] si ça matche, on laisse les cartes face visible et
- [x] on augmente un compteur (servira à savoir si on a trouvé toutes les paires)
- [x] sinon : on retourne les cartes (jouer avec les classes)
- [x] penser à vider les tableaux liés à cette série de 2 clics

## IV. Ajouter du temps

### IV.1 Afficher les informations

- [x] Dynamiser la barre de progression en fonction du temps qui s'écoule

- [x] Faire un appel à la BDD depuis le client pour obtenir le meilleur temps et l'afficher (mise à jour en même temps que la création du plateau)

### IV.2 Enregistrer les chronos en base de données

- [x] Mettre en place l'archi back du projet avec Node.js

On ne va stocker qu'une donnée (qui sera mise à jour dès que le meilleur chrono aura évolué) :

- [x] créer la base de données
- [x] créer la table
- [x] créer 1 donnée

CRUD : mettre en place la lecture et écriture des temps :

  - [x] lecture = le meilleur temps
  - [x] mise à jour = si le temp de la partie qui vient de finir est meilleur de le meilleur temps :
    - [x] côté client : à la fin de la partie comparer les temps  et envoyer l'info au serveur si la condition est remplie
    - [x] côté serveur : mettre à jour la base de données

### IV.2 Afficher les informations

### V. Fin du jeu

Le jeu est terminé :
- si toutes les paires ont été trouvées avant le temps imparti :
  - [x] comparer le nombre de paire trouvées avec le nombre de paires à trouver
- si le temps est écoulé = perdu
  - [x] si la barre de progression est remplie, alerter l'utilisateur

## VI. Et après ?

- [x] Penser à pusher le repo 😉

Envie d'aller plus loin ?

- Améliorer le design
- Rendre le jeu responsive
- Ajouter un bouton "rejouer"
- Faire évoluer les fonctionnalités comme par exemple :
  - demander le nom du joueur et l'enregistrer en base de données pour créer un tableau des Highscores
  - ajouter des niveaux de difficulté (le temps diminue)
  - ajouter un second joueur
  - ajouter la possibilité de changer la taille du plateau de jeu (attention, nécessitera sûrement un nouvel éventail de cartes si on augmente la taille)
  - stocker les coordonnées et l'emplacement des cartes en BDD
