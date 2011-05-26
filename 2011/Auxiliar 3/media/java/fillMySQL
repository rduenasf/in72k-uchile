#!/usr/bin/env node
var express = require('express')
, Sequelize = require('sequelize')
, postsPrueba = require('./postsPrueba');

/* Connecting */
var sequelize = new Sequelize('in72k_aux3', 'root', null,
 { host: "localhost", port: 3306 });

/* Defining the Schema for a Blog Post */
var Post = sequelize.define('post', {
 id     : { type: Sequelize.INTEGER, autoIncrement: true },
 title  : { type: Sequelize.STRING, allowNull: false },
 body   : { type: Sequelize.TEXT, allowNull: false }
});

/* Removing old entries */
Post.sync({ force: true }).on('success', function() {
  
  /* Insert blog posts */
  var chainer = new Sequelize.Utils.QueryChainer;
  for(var index in postsPrueba) {
    chainer.add(Post.build({id: parseInt(index) + 1, title: postsPrueba[index].title, body: postsPrueba[index].body}).save());
  }
  chainer.run().on('success', function() { console.log("MySQL OK."); });
});

