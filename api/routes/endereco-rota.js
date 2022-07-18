const express = require('express');
const router = express.Router();
const controllerEndereco = require('../controllers/endereco-controller');

router.get('/', controllerEndereco.get_all);

module.exports = router;