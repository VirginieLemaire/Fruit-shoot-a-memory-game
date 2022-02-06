// Récupérer le modèle dont on aura besoin
const Chrono = require('../models/chrono');

const chronoControler = {
    findChrono : async (request, response) => {
        /* // Vérification que le code arrive ici
        console.log("je suis dans le controller findChrono"); */
        try {
            const chrono = await Chrono.find();
            response.json(chrono);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = chronoControler;