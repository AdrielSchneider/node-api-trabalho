const mongoose = require('mongoose');
const PessoaModel = mongoose.model('Pessoa');

module.exports = {
  get_all: async function (req, res, next) {
    const pessoas = await PessoaModel.find();
    res.status(200).json({
      quantidade: pessoas.length,
      pessoas: pessoas
    });
  }
}