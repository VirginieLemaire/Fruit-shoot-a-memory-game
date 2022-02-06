/* Récupérer le module dont on aura besoin,
ici on récupère la classe Chrono pour pouvoir utiliser
ses méthodes */
const Chrono = require('../models/chrono');

const chronoControler = {
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