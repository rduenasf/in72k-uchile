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
  app.use(express.bodyParser());

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
                                 
    app.all('/dynamic/ajax/update', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'x-requested-with');
        res.header('Access-Control-Allow-Methods', 'POST');
        if(req.isXMLHttpRequest){
            console.log("asdf");
            Post.find({where: {id: req.body.id}}).on('success', function(post){
                post.title = req.body.title;
                post.save().on('success', function(){
                    res.end();
                });
            });
        } else {
            res.end();
        }
    });

    app.all('/dynamic/ajax/delete', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'x-requested-with');
        res.header('Access-Control-Allow-Methods', 'POST');
        if(req.isXMLHttpRequest){
            Post.find({where: {id: req.body.id}}).on('success', function(post){
                post.destroy().on('success', function(){
                    res.end();
                });
            });
        } else {
            res.end();
        }
    });


/* Everything's ok, let's listen */
var port = 8124;
app.listen(port);
var url = "nodemysqlserver";
console.log('Server running at http://' + url + ':' + port + '/');
console.log('Dynamic view at http://' + url + ':' + port + '/dynamic/');