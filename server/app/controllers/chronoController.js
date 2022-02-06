/* Récupérer le module dont on aura besoin,
ici on récupère la classe Chrono pour pouvoir utiliser
ses méthodes */
const Chrono = require('../models/chrono');

const chronoControler = {
    /**
     * La méthode findChrono va transmettre la requête au modèle
     * où la classe Chrono a été déclarée et attendre sa réponse.
     * Pour ne pas tout bloquer on exécute le code en asynchrone
     * avec les mots-clefs async et await
     * @returns {Object} retourne le meilleur chrono
     */
    findChrono : async (request, response) => {
        /* Vérification que le code arrive ici
        console.log("je suis dans le controller findChrono"); */
        try {
            /* On utilise la méthode find de la classe Chrono*/
            const chrono = await Chrono.find();
            response.json(chrono);
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Mise à jour du meilleur temps
     * @param {Object} request un objet json envoyé dans le body
     *  par le client
     * 
     */
    updateChrono: async (request, response) => {
        /*  Vérification que le code arrive ici
        console.log("je suis dans le controller updateChrono"); */
        try {
            console.log(request.body);
            
            // récupérer l'info arrivant du client et créer un objet pour instancier la classe
            const data = {
                id: 1, //il n'y a qu'une donnée en DB, l'id est donc 1
                chrono: request.body.chrono
            };
            // l'envoyer en DB
            /* En passant l'objet "data" à la nouvelle instance de "Chrono",
            ses propriétés vont passer par le constructeur de la classe et être disponibles dans "this"
            (voir la classe dans le fichier de modèle chrono.js) */
            const newChrono = await new Chrono(data).update();
            console.log("nouveau meilleur chrono enregistré: ", newChrono);

        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = chronoControler;