const express = require('express');
const bcrypt = require('bcrypt-nodejs'); // To generate hash from password
const cors = require('cors'); // cors - cross domain request
const knex = require('knex'); // To connect database to the server
const signIn = require('./Controllers/signIn');
const register = require('./Controllers/register');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
    client: 'pg',  //postgres
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });


const app = express();

// To get response data in json format (app.use is a middle ware , evrything get exicute after this)
app.use(express.json());

// To make cros domain request(cors - cross domain request)
app.use(cors());

app.get('/', (req, res) => {
    res.send('Got from server');
})

// Sign in
app.post('/signIn', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});


//Register user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});


//To fetch user data
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});


//To increase entries of user
app.put('/image', (req, res) => { image.handleImageEnrty(req,res, db) })

//To do api call
app.post('/imageurl', (req, res) => { image.handleImageUrl(req,res,db) })


app.listen(process.env.PORT || '3001', () => console.log(`examble app run at ${process.env.PORT || '3001'} port`));