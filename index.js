const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = 8000;
const db = require('./config/mongoose');

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

// use express router
app.use('/', require('./routes'));

// set up the view engine. 
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if (err){
        console.log(`error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
});