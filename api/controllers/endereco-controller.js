const mongoose = require('mongoose');
const EnderecoModel = mongoose.model('Endereco');

module.exports = {
  get_all: async function(req, res, next) {
    const enderecos = await EnderecoModel.find();
    res.status(200).json({
      quantidade: enderecos.length,
      enderecos: enderecos
    })
  }
}