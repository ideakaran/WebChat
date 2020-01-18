const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');

const container = require('./container');

//resolve modules
container.resolve(function(users){
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/webchat',{ useUnifiedTopology: true });
    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function(){
            console.log('Listening on port 3000');
        });

        ConfigureExpress(app);

        //Setup router
        const router = require('express-promise-router')();
        users.setRouting(router);

        app.use(router);
    }


    //Configure Express
    function ConfigureExpress(app) {
        //tell express to use every files and folder inside public dir e.g. css, js, imgs
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));
        //note: validator() is a breaking change with v6.0.0, so used npm install express-validatior@5.3.1--save-exact
        app.use(validator());
        app.use(session({
            secret: 'thisisasecretkey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(flash());
        app.use(passport.initialize()); //use this after session
        app.use(passport.session());
    }
});
