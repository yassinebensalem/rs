const Fawn = require('fawn');
const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const router = express.Router();
Fawn.init(mongoose);


router.get('/', async(req, res) => {
    const rental = await Rental.find();
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');
  
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
  
    let rental = new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
  
    try {
      new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, { 
          $inc: { numberInStock: -1 }
        })
        .run();
    
      res.send(rental);
    }
    catch(ex) {
      res.status(500).send('Something failed.');
    }
  });

// router.delete('/:id', async(req, res) => {
//     const rental = await Rental.findOne(req.params.id)
//     try{
//         new Fawn.Task()
//         .remove(rental)
//         .update('movies', { _id: movie._id }, { 
//           $inc: { numberInStock: -1 }
//         })
//         .run();
    
//       res.send(rental);
//     }
//     catch(ex){
//         res.status(500).send('Something failed.');

//     }

//     // try {
//     //     new Fawn.Task()
//     //       .remove('rentals',{_id: req.params.id})
//     //       .update('movies', { _id: movie._id }, { 
//     //         $inc: { numberInStock: +1 }
//     //       })
//     //       .run();
      
//     //     res.send(rental);
//     //   }
//     //   catch(ex) {
//     //     res.status(500).send('Something failed.');
//     //   }
// });

// router.delete('/:id', async (req, res) => {
//     const rental = await Rental.findByIdAndRemove(req.params.id);

//     const movie = await Movie.findById(req.body.movieId);
//     if (!movie) return res.status(400).send('Invalid movie.');
//     try{
//         new Fawn.Task()
//         .remove('rentals',rental)
//         .update('movies', { _id: movie._id }, { 
//           $inc: { numberInStock: +1 }
//         })
//         .run();
    
//       res.send(rental);
//     }
//     catch(ex){
//         res.status(500).send('something failed');
//     }
    

// });
module.exports = router;