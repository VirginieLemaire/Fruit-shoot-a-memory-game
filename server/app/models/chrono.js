// Récupérer la connexion à la base de données
const client = require('../database');

/* Création d'une classe correspondant à la table "chrono".
Elle comprendra des méthodes permettant d'intéragir avec la base de données */
class Chrono {
    /**
     * Constructeur : créé les propriétés pour toute la table
     * en bouclant dessus
     * @param {object} obj un objet littéral avec des propriétés copiées dans l'instance
     */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    // Récupérer le meilleur chrono
    /* La table "chrono" n'a qu'une valeur : le meilleur chrono.
    Nous allons récupéper cette valeur.
    Comme il faut attendre la dialogue avec la BDD, on éxécute
    l'action en asynchrone pour ne pas bloquer l'ensemble du code */
    static async find() {
        /* On sécurise l'exécution avec un bloc "try...catch" :
        le code va essayer (try) de s'exécuter correctement,
        s'il n'y arrive pas on attrappe l'erreur (catch) et on
        renvoie l'info */
        try {
            // Aller chercher l'info en base de données
            const { rows } = await client.query('SELECT chrono FROM chrono WHERE id=1');
            console.log(rows); 
            // Renvoyer l'info 
            return rows[0].chrono;

        } catch (error) {
            // Afficher l'info en console
            console.log(error);
            // Envoyer l'info au controller
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Chrono;