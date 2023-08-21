const mongoose = require('mongoose');

const AnimeByPage = new mongoose.Schema({
    AnimeId: {
        type: Number,
        unique: true
    },
    Titre: String,
    Image: String,
    Lien: String,
    Episode: Number,
    Type: String
})

AnimeByPage.virtual('id').get(function () {
    return this._id.toHexString();
});

AnimeByPage.set('toJSON', {
    virtuals: true,
});


exports.AnimeByPM = mongoose.model('AnimeByPM', AnimeByPage)