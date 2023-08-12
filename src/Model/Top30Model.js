const mongoose = require('mongoose');

const Top30Schema = new mongoose.Schema({
    titre: String,
    image: String,
    lien: String,
    type: String
})

Top30Schema.virtual('id').get(function(){
    return this._id.toHexString();
});

Top30Schema.set('toJSON',{
    virtuals: true,
});

exports.Top30Schema = mongoose.model('Top30', Top30Schema)