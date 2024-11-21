const express = require('express');
const router = express.Router();
const pizzasController = require('../controllers/pizzasController');

router.get('/', pizzasController.index);
router.get('/:id', pizzasController.show);
router.post('/', pizzasController.store);
router.put('/:id', pizzasController.update);
router.patch('/:id', pizzasController.modify);
router.delete('/:id', pizzasController.destroy);

module.exports = router;
