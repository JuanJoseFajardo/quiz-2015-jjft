// Definición del modelo de Quiz

// crea una tabla definiendo su estructura:

// pregunta : string
// respuesta: string

// module.exports = function(sequelize, DataTypes)
// 	{
// 	return sequelize.define('Quiz',
// 		{ 
// 		  pregunta : DataTypes.STRING,
// 		  respuesta: DataTypes.STRING
// 		});
// 	};

// con validación de campos

module.exports = function(sequelize, DataTypes)
	{
	return sequelize.define('Quiz',
		{ 
		  pregunta  : {
		  	type    : DataTypes.STRING,
		  	validate: { notEmpty: { msg: "-> Falta Pregunta"}}
		  },
		  respuesta : {
		  	type    : DataTypes.STRING,
		  	validate: { notEmpty: { msg: "-> Falta Respuesta"}}
		  }
		});
	};

