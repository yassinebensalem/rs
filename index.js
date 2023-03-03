const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const genre = require('./routes/genres');
const movie = require('./routes/movies');
const user = require('./routes/users');
const rental = require('./routes/rentals');
const customer = require('./routes/customers');
const auth = require('./routes/auth');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR : JWT is not defined');
    process.exit(1); // process.exit(0) means success anything else like process.exit(1) means failure
}

mongoose.connect('mongodb://localhost/solo')
 .then(() => console.log('Connected successsfully'))
 .catch(err => console.error('Could not connect'));



app.use(express.json());
    
app.use('/api/movies', movie);
app.use('/api/genres', genre);
app.use('/api/customers', customer);
app.use('/api/rentals', rental);
app.use('/api/users', user);
app.use('/api/auth', auth);

const port = 3002;

app.listen(port, () => console.log(`connected on port ${port}`));
