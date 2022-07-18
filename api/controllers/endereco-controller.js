const mongoose = require('mongoose');
const EnderecoModel = mongoose.model('Endereco');

module.exports = {
  get_all: async function(req, res, next) {
    const enderecos = await EnderecoModel.find();
    res.status(200).json({
      quantidade: enderecos.length,
      enderecos: enderecos
    })
  },
  find_by_id: async function(req, res, next) {
    res.status(200).json({
      message: "Deve retornar um único endereco com base no id"
    })
  },
  register: async function(req, res, next) {
    res.status(200).json({
      message: "Deve cadastrar um novo endereco no BD, validar se a pessoa existe"
    })
  },
  delete_by_id: async function(req, res, next) {
    res.status(200).json({
      message: "Deve deletar um endereco do BD"
    })
  }
}