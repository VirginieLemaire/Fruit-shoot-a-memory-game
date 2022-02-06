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
                const card = document.createElement(`div`);
                // ajouter la classe correspondante
                card.classList.add(`board__cell`);
                // l'ajouter à la ligne qui vient d'ête créée
                row.appendChild(card); 
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

            // 3. stocker la carte cliquée

            //4. Voir si on a une paire

        });
        }
    },

 
};
  
  // Lancer l'initiation du jeu une fois que le DOM est lancé
  document.addEventListener("DOMContentLoaded", app.init);
  