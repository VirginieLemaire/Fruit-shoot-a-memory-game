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
                
                // l'ajouter à la ligne qui vient d'ête créée
                row.appendChild(cell); 
            }
        }
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

            // 3. stocker la carte cliquée
            app.clickedData.clickedCards.push(event.target);
            //4. Voir si on a une paire

        });
        }
    },

 
};
  
  // Lancer l'initiation du jeu une fois que le DOM est lancé
  document.addEventListener("DOMContentLoaded", app.init);
  