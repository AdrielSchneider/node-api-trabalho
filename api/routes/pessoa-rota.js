const express = require('express');
const router = express.Router();
const controllerPessoa = require('../controllers/pessoa-controller');

router.get('/', controllerPessoa.get_all);

module.exports = router;