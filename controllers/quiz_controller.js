// Questions and answers controller

// importa el modelo para poder acceder a la DB. Éste a su vez importa quiz.js
var models = require('../models/models.js');


/////////////////////////////////////////////////////////////////////////////////////
// 
// Autoload - factoriza el código si ruta incluye : quizId
// busca en la base de datos el QuizId i si no existe lanza excepción de error
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.load = function( req, res, next, quizId )
	{
	var searchId = { where  : { id: Number(quizId) },
					 include: [ { model: models.Comment }]
				   };
	models.Quiz.find( searchId ). then( function ( quiz )
		{
		if ( quiz )
			{
			req.quiz = quiz;
			next();
			}
		else
			{
			next( new Error('No existe quizId=' + quizId));
			}
		}).catch(function ( error )
			{
			next( error );
			});
	};


///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes
// obtiene una lista de todas las preguntas con gestión de errores
// 
// GET /quizes/search?texto_a_buscar
// obtiene una lista de todas las preguntas que contengan el texto a buscar con gestión de errores
//
// si se le pasa un string para buscar ejecuta una consulta de búsqueda del estring en las preguntas
// con el siguiente criterio:
// Para realizar la búsqueda de las preguntas en la base de datos, usar la función findAll de sequelize.
// Debe usar el operador LIKE y el comodín % en la condición WHERE. Debe usar un formato como este:
//
//findAll({where: ["pregunta like ?", search]}]
//
// No olvidar delimitar el string contenido en search con el comodín % antes y después y
// cambie también los espacios en blanco por %. De esta forma, si busca "uno dos" ("%uno%dos%"),
// mostrará todas las preguntas que tengan "uno" seguido de "dos", independientemente de lo que haya
// entre "uno" y "dos".
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.index = function ( req, res )
	{
	var textToSearch = req.query.search;
	// condicion para mostrar todos los ids (lista de todas las preguntas)
	var condicion    = { where: { id : { "gt" : 0 }} };
	// si incluimos texto a buscar monta la condición de la consulta
	if (textToSearch !== undefined)
		condicion = { where: [ "pregunta like ?", '%' + textToSearch.replace(/(\s)+/g,'%') + '%'] };

	condicion.order = [ ['indice_tematico', 'ASC'], ['pregunta', 'ASC'] ];
	models.Quiz.findAll( condicion ).then( function( quizes )
		{
		// quizes[0].pregunta = condicion.where;
		res.render('quizes/index', { quizes: quizes, errors: [] });
		}).catch( function( error )
			{
			next( error );
			});
	};


///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id
// primitiva para mostrar la pregunta que ya ha procesado el autoload de la DB
// quiz.id       --> identificador de la clave maestra de la tabla Quiz
// quiz.pregunta --> campo pregunta de la tabla Quiz
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.show = function( req, res )
	{
	res.render('quizes/show', { quiz: req.quiz, errors: [] });
	};


///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id/answer
// primitiva para comprobar la respuesta a la pregunta procesada en el autoload de la DB
// quiz.id --> identificador de la clave maestra de la tabla Quiz
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.answer = function( req, res )
	{
	var params = { quiz: req.quiz, respuesta: 'Incorrecta', errors: [] };
	if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase() ) params.respuesta = 'Correcta';
	res.render('quizes/answer', params );
	};


///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/new
// con indice_temático
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.new = function( req, res )
	{
	// crea objeto Quiz con los nombres de los campos de la tabla Quiz
	// para inicializar el formulario
	var quiz = models.Quiz.build( { pregunta: "Pregunta", respuesta: "Respuesta", indice_tematico: "Indice"} );
	res.render('quizes/new', { quiz: quiz, errors: [] });
	};


///////////////////////////////////////////////////////////////////////////
// 
// POST /quizes/create
// con validación de la entrada en los campos de la tabla
// con índice temático
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.create = function( req, res )
	{
	// crea un objeto Quiz que inicializa con el req.body
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then( function( err )
		{
		if ( err )
			{
			// para un error de validación
			res.render('quizes/new', { quiz: quiz, errors: err.errors });
			}
		else
			{
			// guarda el objeto quiz en DB con los campos pregunta y respuesta de quiz
			// para evitar que en la trasacción un ManInTheMiddle añada campos adicionales al form
			quiz.save( { fields: ["pregunta", "respuesta", "indice_tematico"]} ).then ( function()
				{
				// redirección HTTP URL relativo a la lista de preguntas
				res.redirect('/quizes');
				});
			}
		});
	};


/////////////////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id/edit
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.edit = function( req, res )
	{
	//autoload de instancia de quiz
	var quiz = req.quiz;

	res.render('quizes/edit', { quiz: quiz, errors: [] });
	};


//////////////////////////////////////////////////////////////////////////////////////////////
// 
// PUT /quizes/:id
// con índice temático
// 
//////////////////////////////////////////////////////////////////////////////////////////////

exports.update = function( req, res )
	{
	req.quiz.pregunta        = req.body.quiz.pregunta;
	req.quiz.respuesta       = req.body.quiz.respuesta;
	req.quiz.indice_tematico = req.body.quiz.indice_tematico;

	req.quiz.validate().then( function( err )
		{
		if ( err )
			{
			res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
			}	
		else
			{
			// guarda el objeto quiz actualizado en DB con los campos pregunta y respuesta de quiz
			// para evitar que en la trasacción un ManInTheMiddle añada campos adicionales al form				
			req.quiz.save( { fields: ["pregunta", "respuesta", "indice_tematico" ]}).then( function()
				{
				// redirección HTTP URL relativo a la lista de preguntas					
				res.redirect('/quizes');
				});
			}
		});
	};


//////////////////////////////////////////////////////////////////////////////////////////////
// 
// DELETE /quizes/:id
// 
//////////////////////////////////////////////////////////////////////////////////////////////

exports.destroy = function( req, res )
	{
	req.quiz.destroy().then( function()
		{
		res.redirect('/quizes');
		}).catch( function( error )
			{
			next( error );
			});
	};

