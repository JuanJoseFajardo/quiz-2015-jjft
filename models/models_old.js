// Definición de cómo se construye la DB y el modelo importado de (quiz.js)

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Crea nuestra BBDD particularizada para SQLite:
var sequelize = new Sequelize(null, null, null, { dialect: "sqlite", storage: "quiz.sqlite" });

// Importar la definición de la tabla Quiz en quiz.js ('quiz' es 'quiz.js')
// para que pueda acceder a la tabla
// Quiz será un objeto que nos permite acceder a los elemento de la tabla
var Quiz = sequelize.import( path.join(__dirname, 'quiz'));

// exportar definición de tabla Quiz
// para que se pueda importar desde otros lugares de la aplicación y
// dar acceso a los elementos del modelo
exports.Quiz = Quiz;

// creación e inicialización de la DDBB sincronizando el modelo

// sequelize.sync() sincroniza las definiciones de la DB que hay en el fichero quiz.sqlite
// con el modelo definido construyendo la tabla concreta que estará vacía.
// Ejecuta el callback del método success cuando se ha sincronizado

// sequelize.sync() crea e inicializa tabla de preguntas en DB
// success(..) ejecuta el manejador una vez creada la tabla
sequelize.sync().success( function()
	{
	// .count().success() devuelve en count el número de filas de la tabla
	Quiz.count().success( function ( count )
		{
		// .create( ..objeto ..) crea un registro en la tabla que será la primera pregunta de la tabla.
		// los campos de la tabla deben tener el mismo nombre que las propiedades
		if (count == 0) Quiz.create( { pregunta : 'Capital de Italia',
						               respuesta: 'Roma'}).success( function()
						                    {
						                    console.log('Base de datos inicializada');
						                 	});
		});
	});

