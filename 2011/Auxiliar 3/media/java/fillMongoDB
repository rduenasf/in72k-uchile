#!/usr/bin/env node
var express = require('express')
  , Mongoose = require('mongoose')
  , postsPrueba = require('./postsPrueba');

/* MongoDB stuff */
  /* Defining the Schema for a Model */
  Mongoose.model('Posts', new Mongoose.Schema({
    id          : {type: Mongoose.Schema.ObjectId}
  , title       : {type: String}
  , body        : {type: String}
  , createdAt   : {type: Date, default: Date.now}
  , updatedAt   : {type: Date, default: Date.now}
  }));

/* Connecting and loading models */
var db = Mongoose.connect('mongodb://localhost/blog'),
    blog = { posts: db.model('Posts') };

/* Empty the collection */
blog.posts.remove({}, function(err){
  if (!err) console.log("Removing old entries... OK.");
});

/* Insert blog posts */
var saved = 0;
for(var index in postsPrueba) {
  var post = new blog.posts({title: postsPrueba[index].title, body: postsPrueba[index].body});
  post.save(function (err) {
    console.log("Insert into posts collection... OK.");
    if (++saved == postsPrueba.length) {
      console.log("MongoDB OK.");
      process.exit(1);
    }
  });
}