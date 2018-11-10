var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');
var idvalidator = require('mongoose-id-validator');

var Schema = mongoose.Schema;

var ProdutoItem= new Schema({
    idProduto : Number,
    altura : {type: Number, min: 0},
    largura : {type: Number, min: 0},
    profundidade: {type: Number, min: 0},
    idMaterial: Number,
    idAcabamento: Number,
    itemPai:{type: Schema.Types.ObjectId, ref: 'ProdutoItem'} 
});

ProdutoItem.plugin(uniqueValidator); 
ProdutoItem.plugin(idvalidator);
module.exports = mongoose.model('ProdutoItem', ProdutoItem);
