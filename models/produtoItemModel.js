var mongoose = require('mongoose');
//var uniqueValidator = require ('mongoose-unique-validator');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;


var ProdutoItem= new Schema({
    idProduto : {type : String,required : true},
    altura : {type: Number, min: 0, required : true},
    largura : {type: Number, min: 0, required : true},
    profundidade: {type: Number, min: 0, required : true},
    idMaterial: {type : String, required : true},
    idAcabamento: {type : String, required : true},
    filhos:[{type: Schema.Types.ObjectId, ref: 'ProdutoItem'}]
});

//ProdutoItem.plugin(uniqueValidator); 
ProdutoItem.plugin(idvalidator);

module.exports = mongoose.model('ProdutoItem', ProdutoItem);
