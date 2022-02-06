// REQUIRE
require('dotenv').config();
const cors = require('cors'); // autorise les requêtes depquis un autre domaine
const express = require('express');
const router = require('./app/router');

// UTILISER
/**
 * crée une instance d'express
 */
const app = express();

//placer le middleware qui appellera cors avant le reste pour que le reste soit dispo
app.use(cors());

// body-parser pour les routes post qui rendent du json
app.use(express.json());

// PORT
const PORT = process.env.PORT;

// Une fois tout defini on utilise le router
app.use(router);
/* Le router sert d'aiguillage : il dirige l'éxécution du code 
vers les méthodes voulues pour réaliser l'action demandée */

// LANCEMENT DU SERVEUR
app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}`);
});
