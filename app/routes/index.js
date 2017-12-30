'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
//testing recipes
var Recipes=require(path + '/app/models/recipes.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
	
	/*	
	app.route('/recipeHolder')
	.get(isLoggedIn, function (req, res) {
		res.sendFile(path + '/public/recipe.html');
	});
	*/
	//https://fccwebapps-mtanzim.c9users.io:8081/

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/test')
		.get(function(req, res) {
	    	res.send('Hello World!');
		});
	
	app.route('/api/:id/recipe')
		.post( function(req,res){
			//console.log(req.body);
		var newRecipe=new Recipes(req.body);
		newRecipe.save(function(err) {
			if (err) throw err;
			console.log('New Recipe saved successfully!');
			res.json(newRecipe);
		});
		
	});
	app.route('/api/:id/recipe/:recipeID')
		.put(function(req,res){
			console.log(req.params.recipeID);
			console.log(req.body);
			Recipes.findOne({ '_id':req.params.recipeID}, function (err, recipe) {
				if (err) res.send(err);
				console.log(recipe);
				recipe.ingredients.push(req.body);
				recipe.save(function(err) {
					if (err) throw err;
					console.log('New ingredient added successfully!');
					res.json(recipe);
				});
			})
			//res.json({ message: 'Added ingredient to '+req.params.recipeID});
		})
		.delete( function(req,res){
			console.log(req.params.recipeID);
			Recipes.remove({ _id: req.params.recipeID }, function(err, recipe) {
				 if (err)
				 res.send(err);
				 res.json({ message: 'Comment ' +req.params.recipeID + ' has been deleted' });
			 });
	});
	
	//1.test react proxy
	//2 test Mongoose Recipe schema
	app.get('/getRecipes', function(req, res, next) {
		//hack to easily create entries in database
		/*
		var newRecipe = new Recipes({
		  title: 'Pho Ga',
		  ingredients: [{
		  	title:'Chicken',
		  	qty:50,
		  	unit:'g'
		  	
		  }]
		});
		
		newRecipe.save(function(err) {
			if (err) throw err;
			console.log('Initial Recipe saved successfully!');
		});
		*/
		Recipes.find({}, function(err, recipe) {
			if (err) throw err;
			res.json(recipe);
		});
		
	});
	
};
