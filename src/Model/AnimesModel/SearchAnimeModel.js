const mongoose = require('mongoose');

const SearchAnModel  = new mongoose.Schema({
    AnimeId: {
        type: Number,
        unique: true
    },
    Titre: String,
    Image: String,
    Lien: String,
    Type: String
})

SearchAnModel.virtual('id').get(function () {
    return this._id.toHexString();
});

SearchAnModel.set('toJSON', {
    virtuals: true,
});

exports.SearchModel = mongoose.model('SearchModel', SearchAnModel)