// Session controller


// MiddleWare de autorización de accessos HTTP restringidos

exports.loginRequired = function( req, res, next )
	{
	if ( req.session.user ) next();
	else 				    res.redirect('/login');
	};


// GET /login
//
// Formulario de login
exports.new = function( req, res )
	{
	var errors         = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', { errors: errors });
	};


// POST /login
//
// Crear la sesión
exports.create = function( req, res )
	{
	var login    = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar( login, password, function( error, user )
		{
		// si hay error se devuelve mensaje de error de sesión
		if ( error )
			{
			req.session.errors = [ { "message": 'Se ha producido un error: ' + error } ];
			res.redirect("/login");
			return;
			}

		// Crea req.session.user y guarda campos: id y username
		// La sesión se define por la existencia de:  req.session.user
		req.session.user = { id: user.id, username: user.username };
		// redirección a path anterior a login
		res.redirect( req.session.redir.toString() );
		});
	};


// DELETE /logout
//
// Destruir sesión
exports.destroy = function( req, res )
	{
	delete req.session.user;
	delete req.session.expire;
	// delete req.session.errors;
	// redirect a path anterior a login
	res.redirect( req.session.redir.toString());
	};
