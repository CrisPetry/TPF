const Atividade = require('../model/AtividadeSchema');
module.exports = {
    listar: async (req, res) => {
        Atividade.find((err, objetos) => {
            (err ? res.status(400).send(`${err}`) : res.status(200).json(objetos));
        }).populate('Colaborador').populate('Requisicao').sort({ titulo: 1 }); // -1 decrescente 1 crescente
    },
   
    incluir: async (req, res) => {
        let obj = new Atividade(req.body);
        obj.save((err, obj) => {
            (err ? res.status(400).send(err) : res.status(200).json(obj));
        });
    },

    alterar: async (req, res) => {
        let obj = new Atividade(req.body);
        Atividade.updateOne({ _id: obj._id }, obj, function (err) {
            (err ? res.status(400).send(err) : res.status(200).json(obj));
        });
    },

    excluir: async (req, res) => {
        Atividade.deleteOne({ _id: req.params.id }, function (err) {
        (err ? res.status(400).send(err) : res.status(200).json("Atividade deletada com seucesso!"));
        });
    },

    obterPeloId: async (req, res) => {
        Atividade.findOne({ _id: req.params.id }, function (err, obj) {
            if (err)
                res.status(400).send(err);
            res.status(200).json(obj);
        });
        
    },

    filtrar: async (req, res) => {
       Atividade.find({
            $or: [
                { nome: { $regex: req.params.filtro, $options: "i" } },
                { email: { $regex: req.params.filtro, $options: "i" } },
            ],
        }, function (err, objetos) {
            if (err)
                res.status(400).send(err);
                res.json(objetos);    
        }).sort({ nome: -1 }); // -1 decrescente 1 crescente
       
    },
};