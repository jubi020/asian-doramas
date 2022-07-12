const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('bcrypt/promises');
const Schema = mongoose.Schema;

const saltRounds = 10;  //  Data processing speed for hashing

//creating the user schema 
const favouriteSchema = new mongoose.Schema({
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    dramaId:{
        type:String
    },
    dramaTitle:{
        type: String
    },
    dramaImage:{
        type:String
    },
    dramaOverview:{
        type:String 
    }
});


const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = {Favourite};