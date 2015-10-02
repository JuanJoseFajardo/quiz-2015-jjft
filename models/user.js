// Definición del modelo de User con validación y encriptación de passwords

var crypto = require('crypto');
var key    = process.env.PASSWORD_ENCRYPTION_KEY;

// crea una tabla definiendo su estructura:

// username : string
// password : string
// isAdmin  : boolean

module.exports = function( sequelize, DataTypes )
	{
	var User = sequelize.define('User',
		{ 
		 username :
		  	{
		  	type     : DataTypes.STRING,
		  	unique   : true,
		  	validate :
		  		{ notEmpty: { msg: "-> Falta Username"},
			  	// --> devuelve mensaje de error si username ya existe
			  	isUnique: function ( value, next )
			  		{
			  		var self = this;
			  		User.find( { where: { username: value }})
			  		.success( function( user )
			  			{
			  			if ( user && self.id !== user.id)
			  				{
			  				return next('Username ya utilizado');
			  				}
			  			return next();
			  			})
			  		.catch( function( err )
			  				{
			  				return next( err );
			  			    });
			  		}
		  		}
		    }
		,password :
		  	{
		  	type     : DataTypes.STRING,
		  	validate : { notEmpty: { msg: "-> Falta Password" }},
		  	set      : function ( password )
					  		{
					  		var encripted = password;
					  		// var encripted = crypto
					  		// 				.createHmac( 'sha1', key )
					  		// 				.update( password )
					  		// 				.digest( 'hex' );
					  		// // Evita passwords vacíos
					  		if (password === '') encripted = '';
					  		this.setDataValue( 'password', encripted );
					  		}
			}		
		,isAdmin :
		  	{
		  	type         : DataTypes.BOOLEAN,
		  	defaultValue : false
		    }		
		},
		{
	    instanceMethods:
	    	{
	      	verifyPassword: function ( password )
	      		{
	      		// encripta el password introducido
	      		var encripted = password;
	      		// var encripted = crypto
		  					// 	.createHmac( 'sha1', key )
		  					// 	.update( password )
		  					// 	.digest( 'hex' );
	      	  	return ( encripted === this.password );
	      		}
	    	}
  		},
		{
	    classMethods:
	    	{
	      	username: function ( id )
	      		{
	      	  	return this.username;
	      		}
	    	}
  		});
	return ( User );
	}
