const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('bcrypt/promises');

const saltRounds = 10;  //  Data processing speed for hashing

//creating the user schema 
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    }, 
    email : {
        type : String,
        trim : true,
        unique : 1             //only unique emails are allowed i.e. two users can't have same email, if they do have the user won't be inserted in the DB
    },
    password : {
        type : String, 
        minlength : 8
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    }

});

//hashing and salting the password before saving it to the database by using the pre middleware
//before calling the save function of the database this middleware "pre" will execute
userSchema.pre('save', function(next){
    var user = this;   //password needs to be updated with the hash value so cant declare the user as constant
    if(user.isModified('password')){
        //hash and salt the password
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            //if no error found then hash the password
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err)
                    return next(err);
                else{
                    user.password = hash;
                    next();
                }
            });
        });
    }else{
        next(); //if the password is not modified then no need to do the hashing again and simply pass the control to the save function in index.js
    }
});

userSchema.methods.comparePassword = function(plainPassword, callback_function){
    bcrypt.compare(plainPassword, this.password, (err, result) => {
        if(err){
            return callback_function(err);
        }else{
            return callback_function(null, result);
        }
    });
}

userSchema.methods.generateToken = function(callback_function){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretkeytobeused');
    user.token = token;
    user.tokenExp = 2*60*60;
    user.save((err, user) => {
        if(err){
            return callback_function(err);
        }
        else{
            return callback_function(null, user);
        }
    });
};

//adding my own custom static function to my DBmodel
userSchema.statics.findByToken = function(token, cb){
    var user = this;
    jwt.verify(token, 'secretkeytobeused', function(err, decoded){
        //decoded will provide the decoded id of the user so now we have to find the user in the database and return the user details in the cb
        user.findOne({"_id": decoded, "token": token} ,(err, user) => {
            if(err) return cb(err);
            else{
                return cb(null, user);
            }
        });
    });
}


const User = mongoose.model('User', userSchema);

module.exports = {User};