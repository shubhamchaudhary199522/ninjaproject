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
       

        
        // , function(err, user){
        //     if (err){
        //         console.log('error in finding user using passport');
        //         return done(err);
        //     }

        //     if (!user || user.password != password){
        //         console.log('username/password is invalid');
        //         return done(null, false);
        //     }

        //     return done(null, user);
            
        // });
    }
));

// serialise the user to decide which key should kept in cookies.

passport.serializeUser(function(user, done){
       done(null, user.id);
});


// deserialise the user from the key in cookies.

passport.deserializeUser(async function(id, done){
   const user = await User.findById(id);
   if (err){
    console.log('error in finding the user -->> deserialise');
    return done(err);
    }

return done(null, user);
    
    // function(err, user){
    //     if (err){
    //         console.log('error in finding the user -->> deserialise');
    //         return done(err);
    //     }

    //     return done(null, user);
    // });
});

module.exports = passport;