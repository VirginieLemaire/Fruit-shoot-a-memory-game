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
        // initié à 0, sera calculé automatiquement dans chooseFruits();
        totalPairsToFind: 0,
    },

    // DONNEES DU TIMER
    timer: {
        /* Définir la largeur de départ du curseur de progression :
        correspond à un % de app.config.givenTime */
        width: 0,
        // Temps écoulé en secondes
        result: 0,
    },

    // DONNEES DE LA PARTIE
    partyData: {
        // Liste des fruits de la partie
        fruitsList: [],
        // Infos de la partie : un tableau d'objets comprenant l'identifiant
        // de la carte et le fruit associé
        fruitPlaceList: [],
        // Nombre de paires trouvées (initialisé à 0)
        found: 0,
    },

    // VERIFICATION DES PAIRES
    clickedData: {
        // l'id de la carte cliquée
        getCellId: 0,
        // Liste des cartes cliquées pour vérification des paires
        clickedCards: [],
        // Liste des fruits cliqués à comparer
        fruitsToCompare: [],
    },

    /*  INITIALISATION DU JEU  */
    init: () => {
        // Afficher les informations de temps
        app.giveChronos();
        // dessiner le plateau
        app.drawBoard();
        // réagir aux interactions avec l'utilisateur
        app.play();
    },
    // PLAY 
    play: () => {
        app.listen();
        app.countdown();
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
            app.isPair();
        });
        }
    },
    // Vérifier s'il y a une paire
    isPair: () => {
        // Chercher le fruit correspondant à la carte
        const findCorrespondingFruit = app.partyData.fruitPlaceList.find(element => element.cell == app.clickedData.getCellId).fruit;

        // Stocker le nmr de fruit trouvé
        app.clickedData.fruitsToCompare.push(findCorrespondingFruit);
        console.log(`la carte nmr ${app.clickedData.getCellId} correspond au fruit nmr: ${findCorrespondingFruit}`);

        // si le tableau a 2 entrées, alors on compare les cartes
        if (app.clickedData.fruitsToCompare.length == 2) {
            setTimeout(() => {
                console.log("je rentre dans setTimeout");
                console.log(`length = ${app.clickedData.fruitsToCompare.length}, on vérifie`);
                console.log(`on compare les fruits suivants : ${app.clickedData.fruitsToCompare}`);

                // Si les cartes ne correspondent pas, on les retourne
                if (app.clickedData.fruitsToCompare[0] != app.clickedData.fruitsToCompare[1]) {
                    console.log("liste des cartes cliquées", app.clickedData.clickedCards.length);
                    console.log("ça ne correspond pas, on retourne les cartes");

                    //retourner les cartes
                    app.clickedData.clickedCards[0].classList.remove("board__cell--selected");
                    app.clickedData.clickedCards[1].classList.remove("board__cell--selected");

                    // on vide la liste des fruits à comparer
                    app.clickedData.fruitsToCompare = [];
                    console.log("on vide la liste des fruits à comparer et on continue: " , app.clickedData.fruitsToCompare);

                    // on vide la liste des cartes cliquées
                    app.clickedData.clickedCards = [];
                    console.log("la liste des cartes cliquées est vidée: " , app.clickedData.clickedCards);
                }
                // sinon on les laisse affichées 
                else {
                    console.log("ça matche ! On garde les fruits affichés");

                    // incrémenter le nb de paires trouvées
                    app.partyData.found++;
                    // on vide la liste des fruits sélectionnés
                    app.clickedData.fruitsToCompare = [];
                    // on vide la liste des cartes cliquées
                    app.clickedData.clickedCards = [];

                    console.log("la liste des fruits à comparer est vidée: " , app.clickedData.fruitsToCompare);
                    console.log("la liste des cartes cliquées est vidée: " , app.clickedData.clickedCards);

                    // Voir si c'est gagné en vérifiant si on a trouvé toutes les paires
                    if (app.partyData.found === app.config.totalPairsToFind) {
                        console.log("on compare le temps avec le meilleur temps");

                        // 1. Envoi du chrono en DB si c'est le meilleur temps
                        // Vérifier si c'est un nouveau highscore
                        if (app.timer.result < app.timer.bestChrono) {
                            console.log("youhou, nouveau best score !");

                            // Envoyer en DB
                            app.updateBestChrono();
                        }
                        // 2. Prévenir le joueur
                        alert(`Bravo, c'est gagné en ${app.timer.result} secondes !`);
                    }
                }
            },500);
            // console.log("liste des events après vérif: ", app.clickedData.clickedCards);
        } else {
            console.log( "dans le else, nb de fruits à comparer: ",app.clickedData.fruitsToCompare.length);
        }

    },

    /* GESTION DU TIMER */

    // Faire grandir la barre de progression
    countdown : () => {
        console.log("Temps imparti : ", app.config.givenTime, " secondes");

        const grow = () => {
            if (app.timer.width <100) {
                app.timer.width ++;
                app.timer.result = app.config.givenTime * app.timer.width/100;
                // la barre de décompte du temps
                const progressBar= document.querySelector("span");
                //progressBar.textContent = `${app.timer.width}`;
                progressBar.style.width = `${app.timer.width}%`;
            } else {
                console.log(app.timer.result, " secondes");
                // Prévenir
                alert("Aïe, c'est perdu !");
                // Stopper le chrono
                clearInterval(interval);
            }
        };
        /* Je veux augmenter la barre de progression toutes les secondes :
        je multiplie le temps imparti par 10 (1000 ms / 100%) */
        const interval = setInterval(grow, app.config.givenTime*10);
    },

    /* GERER LES INFOS DE CHRONO */

    giveChronos: () => {
        // 1. Afficher le temps imparti
        // 1.a récupérer l'elément DOM
        const givenTime = document.getElementById('given');
        // 1.b lui ajouter du texte
        givenTime.textContent= `${app.config.givenTime} s.`;

        // 2. Affficher le meilleur chrono
        app.getBestChrono();
    },
    /**
     * Méthode pour récupérer le meilleur chrono
     * enregistré en DB
     */
    getBestChrono: async() => {
        try {
            // 1. Aller chercher le meilleur chrono
            //1.a requête fetch à l'API
            const result = await fetch('http://localhost:3000/');
            // 1.b récupérer les infos renvoyées par l'API
            const bestChrono = await result.json();
            console.log("bestChrono: ",bestChrono);
            // 2. Afficher le meilleur chrono sur la page
            // 2.a récupérer l'elément DOM
            const bestElement = document.getElementById('best');
            // 2.b lui ajouter du texte
            bestElement.textContent= `${bestChrono} s.`;
            // 2.c stocker le chrono dans l'app
            app.timer.bestChrono = bestChrono;
        } catch (error) {
            console.trace(error);
        }
    },


 
};
  
  // Lancer l'initiation du jeu une fois que le DOM est lancé
  document.addEventListener("DOMContentLoaded", app.init);
  