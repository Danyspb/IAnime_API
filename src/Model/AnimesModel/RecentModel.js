const mongoose = require('mongoose');

const RecentSchema = new mongoose.Schema({
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

RecentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

RecentSchema.set('toJSON', {
    virtuals: true,
});


exports.RecentModel = mongoose.model('RecentModel', RecentSchema)