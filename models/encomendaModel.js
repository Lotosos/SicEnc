var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Encomenda = new Schema({
    cliente : String,
    itens : [{type: Schema.Types.ObjectId, ref: 'ProdutoItem'}]
});

module.exports = mongoose.model('Encomenda', Encomenda);
