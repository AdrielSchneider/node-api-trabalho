const mongoose = require('mongoose');
const PessoaModel = mongoose.model('Pessoa');

module.exports = {
  get_all: async function (req, res, next) {
    const pessoas = await PessoaModel.find();
    res.status(200).json({
      quantidade: pessoas.length,
      pessoas: pessoas
    });
  },
  find_by_id: async function(req, res, next) {
    res.status(200).json({
      message: "Deve retornar uma única pessoa com base no id"
    })
  },
  register: async function(req, res, next) {
    res.status(200).json({
      message: "Deve cadastrar uma nova pessoa no BD"
    })
  },
  delete_by_id: async function(req, res, next) {
    res.status(200).json({
      message: "Deve deletar uma pessoa do BD"
    })
  }
}