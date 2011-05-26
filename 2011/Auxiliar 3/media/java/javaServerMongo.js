#!/usr/bin/env node
var express = require('express')
  , Mongoose = require('mongoose');

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

/* app server */
  var app = express.createServer();

  app.use(express.favicon(__dirname + '/../../cliente/mongo-favicon.ico'));
  app.use(express.static(__dirname + '/../../cliente'));

  /* use jade template engine */
  app.set('view engine', 'jade');
  app.set('view options');

  app.dynamicHelpers({ base: function() { return 'dynamic'; } });

  /* ROUTING: App Server */
    /* shows the blog index */
    app.get('/dynamic', function(req,res){
      blog.posts.find({}, function(err, posts) {
        res.render('index', {base: 'dynamic', count: posts.length, posts: posts});
      });
    });

/* Everything's ok, let's listen */
var port = 8125;
app.listen(port);
var url = "nodemongoserver";
console.log('Server running at http://' + url + ':' + port + '/');
console.log('Dynamic view at http://' + url + ':' + port + '/dynamic/');