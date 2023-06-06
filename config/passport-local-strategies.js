const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },

   async function(email, password, done){
        // find a user and establish the indentity
        try {
            const user = await User.findOne({email: email});

            if (!user || user.password != password){
                        console.log('username/password is invalid');
                        return done(null, false);
                    }

                    return done(null, user);

          } catch (err) {
            console.log('error in finding user using passport');
            return done(err);
        }
    }
));

// serialise the user to decide which key should kept in cookies.
passport.serializeUser(function(user, done){
       done(null, user.id);
});


// deserialise the user from the key in cookies.
passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
    console.log('error in finding the user -->> deserialise');
    return done(err);
    }
});

// check if the user is authenticated.
passport.checkAuthentication = function(req, res, next){
 // if the user is signed in, then pass on the request to next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current singed in user from the session cookies and we are just sending this to locals for the views
      res.locals.user = req.user;
    }
     next();
}


module.exports = passport;