/*
File name: book.js
Author's name: Peyman Moshfegh
StudentID: 301151808
Web App name: Midterm-301151808
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  // Renders add page
  res.render('books/details', {
    title: 'Add',
    books: '',
    action: '/books/add'
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  const Book = {
    Title: req.body.title,
    Description: req.body.description,
    Price: parseInt(req.body.price),
    Author: req.body.author,
    Genre: req.body.genre
  }
  // Creates the book on MongoDB Atlas
  book.create(Book, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  book.findById( id , (err, book) => {
    if (err) {
      return console.error(err);
    } else {
      // Renders Details Page
      res.render('books/details', {
        title: 'Edit a Book',
        books: book,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  const update = {
    Title: req.body.title,
    Description: req.body.description,
    Price: parseInt(req.body.price),
    Author: req.body.author,
    Genre: req.body.genre
  }
  book.update( {_id: id} , update, (err, result) => {
    if (err) {
      return console.error(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove( {_id: id} , (err) => {
    if (err) {
      return console.error(err);
    } else {
      res.redirect('/books');
    }
  });
});


module.exports = router;
