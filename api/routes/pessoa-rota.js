const express = require('express');
const router = express.Router();
const controllerPessoa = require('../controllers/pessoa-controller');

router.get('/', controllerPessoa.get_all);

router.get('/:pessoaId', controllerPessoa.find_by_id);

router.post('/', controllerPessoa.register);

router.delete('/:pessoaId', controllerPessoa.delete_by_id);

module.exports = router;