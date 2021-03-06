// User controller

var models = require('../models/models.js');

// Comprueba si el usuario está registrado en users
// Si autenticación falla o hay errores se ejecuta callback( error )
exports.autenticar = function( login, password, callback )
	{
	models
	.User
	.find( { where: { username: login }})
	.success( function ( user )
		{
		if ( user )
			{
			if ( user.verifyPassword( password )) callback( null, user );
			else								  callback( new Error('Password erróneo'));
			}
		else
			callback( new Error('No existe usuario = ' + login));
		})
	.catch( function ( error ) 
				{
				callback( error );
				});
	};
