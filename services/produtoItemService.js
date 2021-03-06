var ProdutoItem = require('../models/produtoItemModel');
var baseUrl = "https://sic20181106055047.azurewebsites.net/api/";
var Client = require('node-rest-client').Client;
var client = new Client();
//var ClientPromise = require('node-rest-client-promise');
//clientP = ClientPromise.client({});
const Promise = require('bluebird');
var ProdRep = require('../repositories/produtoItemRepository');

var produtoUrl = baseUrl + "produto/";


exports.itemValidator = function(value,req, res, next){
    return new  Promise(function(resolve, reject){
            
        let urlaux = baseUrl + "produto/validar/" + value.idProduto 
                + "/altura=" + value.altura
                + "&largura=" + value.largura
                + "&profundidade=" + value.profundidade
                + "&idMaterial=" + value.idMaterial
                + "&idAcabamento=" + value.idAcabamento;

                console.log("pai");

        client.get(urlaux, function(data, response){
                if(response.statusCode == 200){
                    console.log("pai1");
                    resolve();
                }else{
                    console.log("pai2");
                    return reject(new Error(data.message));
                }
        });
        
    });
}
exports.filhosValidator = function(value,req, res, next) {
    console.log("filhos");
    return Promise.each(value.filhos, filho => {
        console.log("filhos1");
        return exports.validarFilho(value, filho);
    });    
}

exports.validarFilho = function(pai, filho) {
    return new Promise(function(resolve, reject){
        let urlaux = baseUrl + "produto/validar/" + pai.idProduto 
        + "/altura=" + pai.altura
        + "&largura=" + pai.largura
        + "&profundidade=" + pai.profundidade
        + "&idMaterial=" + pai.idMaterial
        + "&idAcabamento=" + pai.idAcabamento
        + "/"+ filho.idProduto 
        + "/altura=" + filho.altura
        + "&largura=" + filho.largura
        + "&profundidade=" + filho.profundidade
        + "&idMaterial=" + filho.idMaterial
        + "&idAcabamento=" + filho.idAcabamento;
        console.log(urlaux);
        client.get(urlaux, function(data, response){
            if(response.statusCode == 200){
                resolve();
            }else{
                reject(new Error(data.message));
            }
        });
    });
}

exports.createModelFromBody = function(body,req, res, next) {
    return new ProdutoItem({
        idProduto : body.idProduto,
        altura : body.altura,
        largura : body.largura,
        profundidade: body.profundidade,
        idMaterial: body.idMaterial,
        idAcabamento: body.idAcabamento,
        filhos: body.filhos
    });
}

exports.validarFilhosObrigatorios = function(item,req, res, next) {
    return new Promise(function(resolve, reject){
        var str= ""; 
        item.filhos.forEach(function(filho){                 
            str+=filho.idProduto + ";";
        });
        str = str.substring(0, str.length - 1);
        let urlaux = baseUrl + "produto/validar/" +item.idProduto
                    + "/filhos=" + str;
                    console.log("obrigatorio");
        if(item.filhos.length == 0) {
            urlaux = urlaux + "-1";
        }
        client.get(urlaux, function(data, response){
            if(response.statusCode == 200){
                ProdRep.createProdutoItem(req.body).then(function(itemP){
                    console.log(itemP);
                    res.send(itemP);           
                }).catch(next);
            }else{
                //resolve();
                console.log(urlaux);
                return reject(new Error(data.message));
            }
        });
    });
}

exports.validarFilhosObrigatoriosUpdate = function(item,req, res, next) {
    return new Promise(function(resolve, reject){
        var str= ""; 
        item.filhos.forEach(function(filho){                 
            str+=filho.idProduto + ";";
        });
        str = str.substring(0, str.length - 1);
        let urlaux = baseUrl + "produto/validar/" +item.idProduto
                    + "/filhos=" + str;
                    console.log("obrigatorio");
        if(item.filhos.length == 0) {
            urlaux = urlaux + "-1";
        }
        client.get(urlaux, function(data, response){
            if(response.statusCode == 200){
                ProdRep.findByIdAndUpdate(req.params.id, req.body).then(function (prodItem) {
                    res.send(prodItem);
                }).catch(next)
            }else{
                //resolve();
                console.log(urlaux);
                return reject(new Error(data.message));
            }
        });
    });
}