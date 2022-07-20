const mongoose = require('mongoose');
const EnderecoModel = mongoose.model('Endereco');
const PessoaModel = mongoose.model('Pessoa');

module.exports = {
  get_all: async function (req, res, next) {
    const enderecos = await EnderecoModel.find();
    res.status(200).json({
      quantidade: enderecos.length,
      enderecos: enderecos
    })
  },
  find_by_id: async function (req, res, next) {
    try {
      let endereco = await EnderecoModel.findById(req.params.enderecoId);
      if (endereco) {
        res.status(200).json(endereco);
      } else {
        res.status(400).json('Endereço não localizado!');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  register: async function (req, res, next) {
    try {
      const pessoaId = req.body.pessoa_id;
      const pessoa = await PessoaModel.findById(pessoaId);

      if (pessoa) {
        let endereco = new EnderecoModel({});
        endereco.pessoa_id = req.body.pessoa_id;
        endereco.cep = req.body.cep;
        endereco.logradouro = req.body.logradouro;
        endereco.numero = req.body.numero;
        endereco.complemento = req.body.complemento;
        endereco.bairro = req.body.bairro;
        endereco.cidade = req.body.cidade;
        endereco.uf = req.body.uf;

        endereco = await endereco.save();

        res.status(201).json({
          mensagem: 'Endereço salvo com sucesso',
          endereco: {
            _id: endereco._id,
            pessoa_id: endereco.pessoa_id,
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            request: {
              type: 'GET',
              link: "http://localhost:3000/endereco/" + endereco._id
            }
          }
        })
      } else {
        res.status(400).json({ message: 'O id da pessoa utilizado não existe' });
      }

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  delete_by_id: async function (req, res, next) {
    const id = req.params.enderecoId;
    let message = 'Endereço Excluído com Sucesso';
    try {
      let status = await EnderecoModel.deleteOne({ _id: id });

      if (status.deletedCount == 0)
        message = 'Não foi localizado nenhum endereço com o Id informado!';

      res.status(200).json({
        message: message,
        status: status
      })
    } catch (error) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}