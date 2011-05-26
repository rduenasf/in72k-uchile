#!/usr/bin/env node
var express = require('express')
  , Sequelize = require('sequelize');

/* MySQL stuff */
  /* Connecting */
  var sequelize = new Sequelize('in72k_aux3', 'root', null,
   { host: "localhost", port: 3306 });

  /* Defining the Schema for a Blog Post */
  var Post = sequelize.define('post', {
    id     : { type: Sequelize.INTEGER, autoIncrement: true },
    title  : { type: Sequelize.STRING, allowNull: false },
    body   : { type: Sequelize.TEXT, allowNull: false }
  });



/* app server */
  var app = express.createServer();

  app.use(express.favicon(__dirname + '/../../cliente/mysql-favicon.ico'));
  app.use(express.static(__dirname + '/../../cliente'));

  /* use jade template engine */
  app.set('view engine', 'jade');
  app.set('view options');

  app.dynamicHelpers({ base: function() { return 'dynamic'; } });

  /* ROUTING: App Server */
    /* shows the blog index */
    app.get('/dynamic', function(req,res){
      Post.findAll({order: 'id ASC'}).on('success', function(posts) {
        res.render('index', {base: 'dynamic', count: posts.length, posts: posts});
      });
    });

/* Everything's ok, let's listen */
var port = 8124;
app.listen(port);
var url = "nodemysqlserver";
console.log('Server running at http://' + url + ':' + port + '/');
console.log('Dynamic view at http://' + url + ':' + port + '/dynamic/');