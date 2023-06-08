const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = 8000;
const db = require('./config/mongoose');

//used for session cookie.
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategies');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

// use express-ejs-layouts. 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//use static files. 
app.use(express.static('./assets'));

//extract style and script from sub pages into layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine. 
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in db. 
app.use(session({
    name: 'codiel',
    // ToDo change the secret before deployment in production mode.
    secret: 'balahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
       mongooseConnection: db,
       autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
});