// Récupérer la connexion à la base de données
const client = require('../database');

/* Déclaration d'une classe Chrono correspondant à la table "chrono".
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
    Nous allons récupérer cette valeur.
    Comme il faut attendre la dialogue avec la BDD, on éxécute
    l'action en asynchrone pour ne pas bloquer l'ensemble du code */
    static async find() {
        /* On sécurise l'exécution avec un bloc "try...catch" :
        le code va essayer (try) de s'exécuter correctement,
        s'il n'y arrive pas on attrappe l'erreur (catch) et on
        renvoie l'info */
        try {
            // Aller chercher l'info en base de données
            /* On utilise le destructuring pour ne stocker que rows au lieu de
            tout lo'objet result */
            const { rows } = await client.query('SELECT chrono FROM chrono WHERE id=1');
            console.log(rows); 

            // Renvoyer l'info (pas besoin de tout envoyer, la donnée suffit dans notre cas)
            return rows[0].chrono;

        } catch (error) {
            // Afficher l'info en console
            console.log(error);
            // Envoyer l'info au controller
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    /** 
     * Mets à jour le meilleur chrono en base de données
     * (la donnée à entrer passe par le construteur)
     * @returns {int} le meilleur chrono
     */
    async update() {
        console.log("je suis dans le model update");
        /* Pour éviter les attaques de type injections SQL, on utilise une requête préparée :
        la requêtes utilise le principe des variables et ira chercher leur correspondance dans le tableau
        qui est joint à la requête.
        On retourne le chrono à des fins de vérification (facultatif) */
        const { rows } = await client.query('UPDATE chrono SET chrono=$1 WHERE id=$2 RETURNING chrono', [this.chrono, this.id]);
        console.log("rows[0].chrono: ", rows[0].chrono);
        return rows[0].chrono;
    }

}

// Export de la classe
module.exports = Chrono;