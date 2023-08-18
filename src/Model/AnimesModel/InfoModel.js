const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    Titre: {
        type : String,
        unique: true
    },
    CoverImage: String,
    Image: String,
    TitreOriginal: String,
    Type: String,
    Genres: String,
    DateSortie: String,
    DureeEpisode: String,
    Studio: String,
    Description: String,
    Episodes: [{
        Numero: String,
        Liens: String
    }]
})

InfoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
InfoSchema.set('toJSON', {
    virtuals: true
});

exports.InfoMode = mongoose.model('InfoMode', InfoSchema)