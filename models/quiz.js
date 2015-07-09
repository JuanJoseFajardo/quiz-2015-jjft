// Definición del modelo de Quiz

// crea una tabla definiendo su estructura:

// pregunta : string
// respuesta: string

module.exports = function(sequelize, DataTypes)
	{
	return sequelize.define('Quiz',
		{ 
		  pregunta : DataTypes.STRING,
		  respuesta: DataTypes.STRING
		});
	};


