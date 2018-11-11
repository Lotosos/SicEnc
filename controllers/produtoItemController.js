var mongoose = require('mongoose');
var ProdutoItem = require('../models/produtoItemModel');
var async = require("async");
var Client = require('node-rest-client').Client;
var client = new Client();
//var ProdutoItem = mongoose.model(ProdutoItem);
var baseUrl = "https://sic20181106055047.azurewebsites.net/api/";
var produtoUrl = baseUrl + "produto/"

exports.findAll = function(req, res, next){
    ProdutoItem.find({}).then(function(items){
        res.send(items);
    });
};

exports.createItem = function(req, res, next){
    var item = new ProdutoItem({
        idProduto : req.body.idProduto,
        altura : req.body.altura,
        largura : req.body.largura,
        profundidade: req.body.profundidade,
        idMaterial: req.body.idMaterial,
        idAcabamento: req.body.idAcabamento,
        items:req.body.items
    });
    itemValidator(item).then(function(value){ ProdutoItem.create(req.body).then(function(item){
            res.send(item);
    }
       )}).catch(next);

    
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

function itemValidator(value){
    return new  Promise(function(resolve, reject){
            
        var urlaux = baseUrl + "produto/validar/" + value.idProduto 
                + "/altura=" + value.altura
                + "&largura=" + value.largura
                + "&profundidade=" + value.profundidade
                + "&idMaterial=" + value.idMaterial
                + "&idAcabamento=" + value.idAcabamento;

                console.log(urlaux);

        client.get(urlaux, function(data, response){
            if(response.statusCode == 200){
                resolve(value);
            }else{
                //resolve(false);
                reject(new Error('produto invalido'));
            }
        });
    });
}
/*
function filhosValidator(value) {
    var filhos = value.filhos;
    var aux;
    for(var i = 0, size = filhos.length; i < size ; i++){
        aux[i] = ProdutoItem.findById({_id: req.params.id}).then(function(item){
            
        }).catch(next);
    }
}
*/