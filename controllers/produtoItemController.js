var mongoose = require('mongoose');
var ProdutoItem = require('../models/produtoItemModel');
//var ProdutoItem = mongoose.model(ProdutoItem);

exports.findAll = function(req, res, next){
    ProdutoItem.find({}).then(function(items){
        res.send(items);
    });
};

exports.createItem = function(req, res, next){
  /**  var item = new ProdutoItem({
        idProduto : req.body.idProduto,
        altura : req.body.altura,
        largura : req.body.largura,
        profundidade: req.body.profundidade,
        idMaterial: req.body.idMaterial,
        idAcabamento: req.body.idAcabamento,
        items:req.body.items
    });
    item.save(function(err) {
        if(err){
            return next(err);
        }
        res.send('item');
    })
    /**/
   /** */
   ProdutoItem.create(req.body).then(function(item){
        res.send(item);
   }).catch(next);
   /**/
};

exports.deleteProdutoItem = function(req, res, next){
    ProdutoItem.findByIdAndRemove({_id: req.params.id}).then(function(item){
        res.send(item);
    }).catch(next);
}

exports.findbyId = function(req, res, next) {
    ProdutoItem.findById({_id: req.params.id}).then(function(item){
        res.send(item);
    }).catch(next);
}