// server side routing
var passport = require('passport'),
	users = require('../controllers/users.js'),
	courses = require('../controllers/courses.js'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	rolesUtil = require('../utils/roles')

module.exports = function(app){

	// Users API - only available to admins
	app.get('/api/users', rolesUtil.requiresRole('admin'), users.getUsers)

	// create user
	app.post('/api/users', users.createUser)

	// update user
	app.put('/api/users', users.updateUser)

	// Courses API
	app.get('/api/courses', courses.getCourses)

	app.get('/api/courses/:id', courses.getCourseById)

	// log user in
	app.post('/login', users.logUserIn)

	// log user out
	app.post('/logout', users.logUserOut)

	// server side route for the angularjs partials
	app.get('/views/*', function(req, res){
		res.render('../../public/views/' + req.params);
	})

	// not found error for undefined API routes
	app.all('/api/*', function(req, res){
		res.send(404)
	})

	// everything else handled by this route
	app.get('*', function(req, res){
		// pass the index page with currentUser data
		res.render('index', {
			currentUser: req.user
		})
	})
}