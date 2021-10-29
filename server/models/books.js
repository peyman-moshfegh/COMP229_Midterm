/*
File name: book.js
Author's name: Peyman Moshfegh
StudentID: 301151808
Web App name: Midterm-301151808
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
