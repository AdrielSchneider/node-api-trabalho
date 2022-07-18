const express = require('express');
const router = express.Router();
const controllerEndereco = require('../controllers/endereco-controller');

router.get('/', controllerEndereco.get_all);

router.get('/:enderecoId', controllerEndereco.find_by_id);

router.post('/', controllerEndereco.register);

router.delete('/:enderecoId', controllerEndereco.delete_by_id);

module.exports = router;