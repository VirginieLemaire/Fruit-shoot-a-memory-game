const { Router }  = require('express');
const chronoController = require('./controllers/chronoController');
const router = Router();

/** 
 * Récupérer le meilleur chrono
*/
router.get('/', chronoController.findChrono);


/**
 * Une route au cas où aucune ne réponde
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;