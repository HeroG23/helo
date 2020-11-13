require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('Database connected')
}).catch(err => console.log(err))

app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);
app.post('/auth/logout', ctrl.logout);
app.get('api/user', ctrl.getUser);

app.listen(SERVER_PORT, ()=>console.log(`Server listening on port ${SERVER_PORT}`))