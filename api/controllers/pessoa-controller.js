const mongoose = require('mongoose');
const PessoaModel = mongoose.model('Pessoa');
const EnderecoModel = mongoose.model('Endereco');

module.exports = {
  get_all: async function (req, res, next) {
    const pessoas = await PessoaModel.find();
    res.status(200).json({
      quantidade: pessoas.length,
      pessoas: pessoas
    });
  },
  find_by_id: async function (req, res, next) {
    try {
      
      let pessoa = await PessoaModel.findById(req.params.pessoaId);
      let retorno = {pessoa: pessoa};
      
      if (req.query.comEndereco == 'true') {
        let enderecos = await EnderecoModel.find({pessoa_id: pessoa._id});
        retorno.enderecos = enderecos;
      }

      if (pessoa) {
        res.status(200).json(retorno);
      } else {
        res.status(400).json('Pessoa não localizada!');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

  },
  register: async function (req, res, next) {
    try {

      let pessoa = new PessoaModel({});
      pessoa.nome = req.body.nome;
      pessoa.sobrenome = req.body.sobrenome;
      pessoa.telefone = req.body.telefone;
      pessoa.email = req.body.email;
      pessoa.status = req.body.status;

      pessoa = await pessoa.save();

      res.status(201).json({
        mensagem: 'Pessoa salva com sucesso',
        pessoa: {
          _id: pessoa._id,
          nome: pessoa.nome,
          request: {
            type: 'GET',
            link: "http://localhost:3000/pessoa/" + pessoa._id
          }
        }
      })

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  delete_by_id: async function (req, res, next) {
    const id = req.params.pessoaId;
    let message = 'Pessoa Excluída com Sucesso';
    try {
      let status = await PessoaModel.deleteOne({ _id: id });

      if (status.deletedCount == 0)
        message = 'Não foi localizada nenhuma pessoa com o Id informado!';

      res.status(200).json({
        message: message,
        status: status
      })

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}