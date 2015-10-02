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

// Importar definición de la tabla Comment en comment.js ('comment' es 'comment.js')

var comment_path = path.join(__dirname, 'comment');
var Comment      = sequelize.import( comment_path );

// Importar definición de la tabla User en user.js ('user' es 'user.js')

var user_path = path.join(__dirname, 'user');
var User      = sequelize.import( user_path );


// Relación 1 a N entre la tabla Quiz y Comment. ( N comentarios pertenecen a 1 Quiz)
Comment.belongsTo( Quiz );
// Relación 1 a N entre la tabla Quiz y Comment ( un Quiz puede tener N comentarios )
Quiz.hasMany( Comment );

// Relación 1 a N entre la tabla Quiz y User. ( N Quizes pertenecen a 1 User)
Quiz.belongsTo( User );
// Relación 1 a N entre la tabla User y Quiz ( 1 User puede tener N Quizes )
User.hasMany( Quiz );


// exportar definición de tabla Quiz
// para que se pueda importar desde otros lugares de la aplicación y
// dar acceso a los elementos del modelo
exports.Quiz    = Quiz;

// exportar definición de tabla Comments
// para que se pueda importar desde otros lugares de la aplicación y
// dar acceso a los elementos del modelo
exports.Comment = Comment;

// exportar definición de tabla User
// para que se pueda importar desde otros lugares de la aplicación y
// dar acceso a los elementos del modelo
exports.User    = User;

// creación e inicialización de la DDBB sincronizando el modelo

// sequelize.sync() sincroniza las definiciones de la DB que hay en el fichero quiz.sqlite
// con el modelo definido construyendo la tabla concreta que estará vacía.
// Ejecuta el callback del método success cuando se ha sincronizado

// var arrayUsers = [
// 				   { username: 'admin', password: '1234', isAdmin: true  }
// 				  ,{ username: 'pepe' , password: '5678', isAdmin: false }
// 				 ];

// var arrayPreguntas = [
// 					   { pregunta : 'Capital de Italia'                , respuesta: 'Roma'                        , indice_tematico: 'Geografia'  ,UserId: 2 }
// 					  ,{ pregunta : 'Capital de Portugal'              , respuesta: 'Lisboa'                      , indice_tematico: 'Geografia'  ,UserId: 2 }
// 					  ,{ pregunta : 'Capital de España'                , respuesta: 'Madrid'                      , indice_tematico: 'Geografia'  ,UserId: 2 }
// 					  ,{ pregunta : '1er Sistema Operativo Microsoft'  , respuesta: 'MSDOS'                       , indice_tematico: 'Tecnologia' ,UserId: 2 }
// 					  ,{ pregunta : 'Unidad internacional de potencia' , respuesta: 'Watt'                        , indice_tematico: 'Ciencia'    ,UserId: 2 }
// 					  ,{ pregunta : 'Significado de MOOC'              , respuesta: 'Massive Open Online Course'  , indice_tematico: 'Tecnologia' ,UserId: 2 }
// 					];

// sequelize.sync() crea e inicializa tabla de preguntas en DB
// success(..) ejecuta el manejador una vez creada la tabla
sequelize.sync().success( function()
	{
	// .count().success() devuelve en count el número de filas de la tabla
	User.count().success( function ( count )
		{
		// .create( ..objeto ..) crea registros en la tabla que serán las preguntas de la tabla.
		// los campos de la tabla deben tener el mismo nombre que las propiedades
		console.log( '99999999999999999999999' + count );
		console.error( '99999999999999999999999' + count );
		if (count === 0) 
			{
		console.log( count );

			// la tabla se inicializa solo si está vacía
			User.create( { username: 'admin', password: '1234', isAdmin: true  } );
			User.create( { username: 'pepe' , password: '5678', isAdmin: false } )
			// User.bulkCreate( 
			// 	// arrayUsers
			// 	 [
			// 	   { username: 'admin', password: '1234', isAdmin: true  }
			// 	  ,{ username: 'pepe' , password: '5678', isAdmin: false }
			// 	 ]				
				 
			// 	 )
			.success( function()
					{
					console.log('Base de datos (tabla user) inicializada');
					console.error('Base de datos (tabla user) inicializada');
					 // response.send("Error " + err);
					Quiz.count().success( function ( count )
						{
						if ( count === 0 )
							{
										console.log( 'aaaaaaaaaaa' + count );
							// la tabla se inicializa solo si está vacía
							// estos quizes pertenecen al usuario pepe (2)
							// Quiz.create( arrayPreguntas[0] );
							// Quiz.create( arrayPreguntas[1] );
							// Quiz.create( arrayPreguntas[2] );
							// Quiz.create( arrayPreguntas[3] );
							// Quiz.create( arrayPreguntas[4] );
							Quiz.create( { pregunta : 'Capital de Italia'                , respuesta: 'Roma'                        , indice_tematico: 'Geografia'  ,UserId: 2 } )

					// 		Quiz.bulkCreate( 
					// 			// arrayPreguntas
					// [
					//    { pregunta : 'Capital de Italia'                , respuesta: 'Roma'                        , indice_tematico: 'Geografia'  ,UserId: 2 }
					//   ,{ pregunta : 'Capital de Portugal'              , respuesta: 'Lisboa'                      , indice_tematico: 'Geografia'  ,UserId: 2 }
					//   ,{ pregunta : 'Capital de España'                , respuesta: 'Madrid'                      , indice_tematico: 'Geografia'  ,UserId: 2 }
					//   ,{ pregunta : '1er Sistema Operativo Microsoft'  , respuesta: 'MSDOS'                       , indice_tematico: 'Tecnologia' ,UserId: 2 }
					//   ,{ pregunta : 'Unidad internacional de potencia' , respuesta: 'Watt'                        , indice_tematico: 'Ciencia'    ,UserId: 2 }
					//   ,{ pregunta : 'Significado de MOOC'              , respuesta: 'Massive Open Online Course'  , indice_tematico: 'Tecnologia' ,UserId: 2 }
					// ]
					// 			)
							.success( function()
									{
									console.log('Base de datos (tabla quiz) inicializada');
									console.error('Base de datos (tabla quiz) inicializada');
									});
							}
						});
					});
			}
		});
	});

