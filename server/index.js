const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { User } = require('./DBmodels/user'); //fetches the User model
const {Favourite} = require('./DBmodels/favourite'); //fetches the Favourite model
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const auth_middleware = require('./middleware/auth');  //authentication module
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//serving static files from react app
if(process.env.NODE_ENV === 'production'){
    //for serving static files when in production mode
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}


//connecting to the mongodb 
mongoose.connect(config.mongoURL)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

//route for registering the user (handles the registration request to add in a new user)
app.post("/api/users/register", (req, res) => {
    const user = new User(req.body); //creating the doucument for storing the user details in the database using User model from DBmodels/user.js
    //save the user data to the database
    user.save((err, userData) => {
        // console.log(userData);
        if(err){         
            return res.json({registerSuccess: false, err});   //return error msg if error occurs
        }
        else{
            return res.json({registerSuccess:true}); //else return success msg
        }
    });
});

//route for logging in the user
app.post('/api/users/login', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    //find the email 
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            console.log("email not registered");
            return res.json({
                loginSuccess: false, 
                message: "Email not registered. Please Sign Up!"
            });
        }
        else{
            //match the password by using the comparePassword function defined on the userSchema in user.js file
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch){
                    return res.json({
                        loginSuccess: false,
                        message: "Passwords donot match. Please try again"
                    });
                }else{
                    user.generateToken((err, user) => {
                        if(err){
                            return res.status(400).send(err);
                        }else{
                            res.cookie("w_authExp", user.tokenExp, {sameSite:'none', secure:true});
                            return res.cookie("w_auth", user.token, {sameSite:'none', secure:true})
                            .status(200).json({
                                loginSuccess: true,
                                userId: user._id,
                                message: "welcome user"
                            });
                        }
                    });
                }
            });
        }
    }); 

    //generate a token for the session by calling the function defined in user.js
    
});

//route for authorizing the user to access protected resources 
//auth_middleware is the module whereas auth is the function defined within it and we need to use the function.
app.get('/api/users/auth', auth_middleware.auth, (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
    });
});

//route to log the user out of the application
app.get('/api/users/logout', auth_middleware.auth, (req, res) => {
    User.findOneAndUpdate({_id :req.user._id}, {token: "", tokenExp: ""}, (err, result) => {
        if(err){
            return res.json({logoutSuccess: false, error: err});
        }else{
            return res.status(200).send({success: true});
        }
    });
});

app.post('/api/fav/favNumber', auth_middleware.auth, (req, res) => {
    console.log('cant get even inside here')
    //find the favourite info by the drama ID
    Favourite.find({'dramaId' : req.body.dramaId}, function(err, fav){
         if(err){
             return res.status(400).send(err);
         }else{
             return res.status(200).json({success: true, favouriteNumber: fav.length});
         }
     });
});

app.post('/api/fav/isFav', auth_middleware.auth, (req, res) => {
    //find the drama info using the userId and the dramaID
    Favourite.find({'dramaId': req.body.dramaId, 'userFrom': req.body.userFrom}, function(err, fav){
            if(err){
                 return res.status(400).send(err);
            }else{
                let result = false;  
                if(fav.length !== 0){
                     result = true;  //drama has already been favourited
                }
                return res.status(200).json({success: true, isFavourited: result});
            }
     });
    // return res.status(200)
});

app.post('/api/fav/addToFav', auth_middleware.auth, (req, res) => {

    const favList = new Favourite(req.body);
    favList.save((err, favData) => {
        if(err){
            return res.json({success:false, err});
        }else{
            return res.status(200).json({success:true});
        }
    });
});

app.post('/api/fav/removeFromFav', auth_middleware.auth, (req, res) => {

    Favourite.findOneAndDelete({'dramaId': req.body.dramaId, 'userFrom': req.body.userFrom}, function(err, favList){
        if(err){
            return res.status(400).json({success: false, err});
        }else{
            return res.status(200).json({success:true, favList});
        }
    })
});

app.post('/api/fav/getFavDramas', auth_middleware.auth, (req, res) => {
    Favourite.find({'userFrom': req.body.userFrom}, function(err, favList){
        if(err){
            return res.status(400).json({success: false, err});
        }else{
            return res.status(200).json({success: true, favList});
        }
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server listening on port", port);
});
