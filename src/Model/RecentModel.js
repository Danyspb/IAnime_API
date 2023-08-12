const mongoose = require('mongoose');

const RecentSchema = new mongoose.Schema({
    titre: String,
    image: String,
    lien: String,
    episode: Number,
    type: String
})

RecentSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

RecentSchema.set('toJSON', {
    virtuals : true,
})

exports.RecentModel = mongoose.model('RecentModel', RecentSchema)