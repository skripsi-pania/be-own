const mongoose = require('mongoose');
const User = require('./user.model');

const {Schema} = mongoose

const userProfileSchema = new Schema({
    namaDepan: {
        type: String,
        required: true,
    },
    namaBelakang: {
        type: String,
        required: true,
    },
    jenisKelamin: {
        type: String,
        required: true,
    },
    nomorTelepon: {
        type: Number,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }

    
})

const userprofile = mongoose.model('userprofile', userProfileSchema)

module.exports = userprofile
