// Definición de cómo se construye la DB y el modelo importado de (quiz.js)
// modelo para desplegar la DB postgres en HEROKU y SQlite en local

var path = require('path');

// Potgres DATABASE_URL = postgres://user:password@host:port/database
// SQLite  DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// uSAR bbdd SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {  dialect : protocol
												    ,protocol: protocol
												    ,port    : port
												    ,host    : host
												    ,storage : storage  // solo SQlite (.env)
												    ,omitNull: true		// solo Postgres
												  });

// Importar la definición de la tabla Quiz en quiz.js ('quiz' es 'quiz.js')
// para que pueda acceder a la tabla
// Quiz será un objeto que nos permite acceder a los elemento de la tabla
var quiz_path = path.join(__dirname, 'quiz');
var Quiz      = sequelize.import( quiz_path );

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
		// .create( ..objeto ..) crea registros en la tabla que serán las preguntas de la tabla.
		// los campos de la tabla deben tener el mismo nombre que las propiedades
		if (count == 0) 
			{
			Quiz.create( { pregunta : 'Capital de Italia'                , respuesta: 'Roma'                        , indice_tematico: 'Geografia'  });
			Quiz.create( { pregunta : 'Capital de Portugal'              , respuesta: 'Lisboa'                      , indice_tematico: 'Geografia'  });
			Quiz.create( { pregunta : 'Capital de España'                , respuesta: 'Madrid'                      , indice_tematico: 'Geografia'  });
			Quiz.create( { pregunta : '1er Sistema Operativo Microsoft'  , respuesta: 'MSDOS'                       , indice_tematico: 'Tecnologia' });
			Quiz.create( { pregunta : 'Unidad internacional de potencia' , respuesta: 'Watt'                        , indice_tematico: 'Ciencia'    });
			Quiz.create( { pregunta : 'Significado de MOOC'              , respuesta: 'Massive Open Online Course'  , indice_tematico: 'Tecnologia' })
			.success( function()
                {
                console.log('Base de datos inicializada');
             	});					               
			}
		});
	});

