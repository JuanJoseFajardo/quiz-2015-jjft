// Definición del modelo de Comment con validación

// crea una tabla definiendo su estructura:

// comentario_texto : string

module.exports = function( sequelize, DataTypes )
	{
	return sequelize.define('Comment',
		{ 
		  texto  : {
		  	type    : DataTypes.STRING,
		  	validate: { notEmpty: { msg: "-> Falta Comentario"}}
		  }
		});
	};

