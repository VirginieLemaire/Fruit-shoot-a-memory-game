// Récupérer le module pg
const {Client} = require('pg');
/* Créer de la connexion à la BDD en allant chercher les infos
dans les variables d'environnement */
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    //config pour éviter les erreurs avec Heroku
    ssl: {
        rejectUnauthorized: false
    }
});
/* Se connecter avec une callback 
pour être prévenus en cas d'erreur */
client.connect(error => {
    if (error) console.error("erreur de connexion", error.stack);
    else console.log("connecté");
});

// Exporter le module
module.exports = client;