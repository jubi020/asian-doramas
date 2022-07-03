const {User} = require("../DBmodels/user");

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    //find the user according to the token
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        else{
            if(!user ){
                return res.json({
                    isAuth: false,
                    message: "you are not authorized to access this part of the website."
                });
            }
            else{
                req.token = token;
                req.user = user;
                next();   //this executes the code that is written after the middleware wherever the middleware has been called
            }
        }




    });
};

module.exports = {auth};
