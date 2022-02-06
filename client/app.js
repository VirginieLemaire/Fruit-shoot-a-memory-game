const app = {
    // CONFIGURATION
    config : {
        // Le nombre de lignes
        nbRows: 4,
        // Le nombre de cartes par lignes
        nbCells: 7,
        // Le nombre de fruits différents dans le sprite
        totalFruits: 18,
        // Durée de la partie en secondes
        givenTime: 90,
        // L'identifiant de la carte initialisé à 0
        cellId: 0,

    },

    // DONNEES DE LA PARTIE
    partyData: {
        // Liste des fruits de la partie
        fruitsList: [],
        // Infos de la partie : un tableau d'objets comprenant l'identifiant
        // de la carte et le fruit associé
        fruitPlaceList: [],
    },

    // VERIFICATION DES PAIRES
    clickedData: {
        // l'id de la carte cliquée
        getCellId: 0,
        // Liste des cartes cliquées pour vérification des paires
        clickedCards: [],
    },

    /*  INITIALISATION DU JEU  */
    init: () => {
        // dessiner le plateau
        app.drawBoard();
        //écouter
        app.listen();
    },
    /*  MISE EN PLACE DU PLATEAU ET DES CARTES  */  
    // Dessiner le plateau de jeu
    drawBoard : () => {
        // générer la liste des fruits de la partie
        app.chooseFruits();

        /* Création du plateau comprenant des lignes et des cellules (correspond aux cartes) */

        // 1. n fait une 1ère boucle correspondant au nb de lignes (rows)
        for (let i = 0; i < app.config.nbRows; i++) {
            // récupération du parent
            const board = document.querySelector(".board");
            // créer une div de lignes
            const row = document.createElement(`div`);
            // ajouter la classe correspondante
            row.classList.add(`board__row`);
            // l'ajouter au plateau
            board.appendChild(row);

            // 2. puis pour chaque ligne crée, on applique la même
            // méthode pour ajouter le nombre de cartes
            for (let j = 0; j < app.config.nbCells; j++) {
                // créer une div de cartes
                const cell = document.createElement(`div`);
                // ajouter la classe correspondante
                cell.classList.add(`board__cell`);
                // Identifier la carte
                app.config.cellId++;// Incrémenter l'id de la carte à chaque tour de boucle
                cell.setAttribute('cellId',`${app.config.cellId}`);
                // Stocker les données de la partie en associant 1 fruit à chaque carte
                app.partyData.fruitPlaceList.push({
                cell: app.config.cellId,
                // prendre les fruits dans le tableau des fruits de la partie
                // (on peut le prendre dans l'ordre puisqu'il a été mélangé)
                fruit: app.partyData.fruitsList[app.config.cellId - 1], // On enlève 1 car l'index commence à 0
                });
                // Appliquer le style permettant d'afficher le fruit (voir affichage d'un sprite)
                // astuce : on enlève 1 au numéro de fruit pour coincider avec la position
                // dans le sprite -> le fruit 1 est positionné à y=0
                cell.style.backgroundPositionY = `${(app.partyData.fruitsList[app.config.cellId - 1]-1) * -100}px`;
                
                // l'ajouter à la ligne qui vient d'ête créée
                row.appendChild(cell); 
            }
        }
        console.log("infos du jeu : ", app.partyData.fruitPlaceList);
    },
    // Choisir les fruits
    chooseFruits: () => {
        // Il y a plus de fruits dans le sprite que d'emplacements
        // sur le plateau. Il faut calculer le nombre de fruits à sélectionner
        // => nb total de cartes du plateau / 2
        const totalCells = app.config.nbCells * app.config.nbRows;
        app.config.totalPairsToFind = totalCells / 2;

        // Créer la liste des fruits de la partie
        for (let i = 0; i < app.config.totalPairsToFind; i++) {
            /* Il faut :
            - choisir un fruit au hasard : randomFruit
            - vérifier qu'il n'a pas déjà été tiré au sort : checkFruit
            Pour ça  on  va créer une boucle conditionnelle : on exécute les instructions
            placées dans le "do" tant que le nmr de fruit n'existe pas déjà
            dans le tableau des fruits. Avant de lancer la boucle, on initialise
            la vérification "checkFruit" à true. */
            let checkFruit = true;
            do {
                // Stocker un nmr de fruit au hasard 
                // auquel on ajoute 1 pour éviter d'avoir 0
                // ce qui donnerait un faux false avec la méthode .find()
                // utilisée juste après
                let randomFruit = Math.floor(Math.random() * (app.config.totalFruits))+1;
                // Pour s'assurer que ce fruit ne sera pas présent en double,
                // on cherche s'il existe dans le tableau des fruits de la partie
                checkFruit = app.partyData.fruitsList.find((number) => number === randomFruit);
                // s'il 'existe pas, on l'y met
                if (!checkFruit) {
                    // Envoyer les données deux fois (pour voir une paire)
                    app.partyData.fruitsList.push(randomFruit, randomFruit);
                }
            } while (checkFruit);
        }
        // Mélanger les fruits dans le tableau
        app.partyData.fruitsList.sort((a, b) => 0.5 - Math.random());
        //console.log("fruitsList mélangée", app.partyData.fruitsList);
    },
    // Ecouter les évènements sur les cartes
    listen: () => {
        // Récupérer un tableau listant toutes les cartes
        const allCells = document.getElementsByClassName('board__cell');
        // PLacer l'écouteur sur chaque carte
        for (const cell of allCells) {
        cell.addEventListener("click", function (event) {
            console.log("carte cliquée");
            // 1. Faire apparaitre la carte
            // En changeant la classe, on peut déterminer
            // un autre affichage pour la même div ;)
            event.target.classList.toggle("board__cell--selected");
    
            // 2. Stocker l'id de la carte cliquée
            app.clickedData.getCellId = event.target.getAttribute('cellId');
            console.log(app.clickedData.getCellId);

            // 3. stocker l'id de la carte cliquée
            app.clickedData.clickedCards.push(event.target);
            //console.log("liste des events", app.clickedData.clickedCards);

            //4. Voir si on a une paire

        });
        }
    },

 
};
  
  // Lancer l'initiation du jeu une fois que le DOM est lancé
  document.addEventListener("DOMContentLoaded", app.init);
  