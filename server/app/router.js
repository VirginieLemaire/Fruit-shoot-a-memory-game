const { Router }  = require('express');
const chronoController = require('./controllers/chronoController');
const router = Router();

/** 
 * Récupérer le meilleur chrono
*/
router.get('/', chronoController.findChrono);
/* Ici on voit qu'en arrivant avec le verbe HTTP GET sur l'endpoint '/'
le routeur dirige vers la méthode finChrono() du controller 
chronoController */

/**
 * Mettre à jour le meilleur chrono
 * @param
 */
 router.patch('/', chronoController.updateChrono);

/**
 * Une route au cas où aucune ne réponde
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;