// Questions and answers controller

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// importa el modelo para poder acceder a la DB. Éste a su vez importa quiz.js
var models = require('../models/models.js');
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Autoload - factoriza el código si ruta incluye : quizId
// busca en la base de datos el QuizId i si no existe lanza excepción de error
exports.load = function( req, res, next, quizId )
	{
	models.Quiz.find( quizId ). then( function ( quiz )
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
// obtiene una lista de todas las preguntas sin gestión de errores
// 
// exports.index = function ( req, res )
// 	{
// 	models.Quiz.findAll().then( function( quizes )
// 		{
// 		res.render('quizes/index.ejs', { quizes: quizes });
// 		});
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes
// obtiene una lista de todas las preguntas con gestión de errores
// 
exports.index = function ( req, res )
	{
	models.Quiz.findAll().then( function( quizes )
		{
		res.render('quizes/index', { quizes: quizes });
		}).catch( function( error )
			{
			next( error );
			});
	};
// 
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/question
// sin acceso a DB
// 
// exports.question = function(req, res)
// 	{
// 	res.render('quizes/question', { title: 'Quiz', pregunta: 'Capital de Italia'});
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/question
// modifica el controlador para que busque en la DB
// 
// exports.question = function(req, res)
// 	{
// 	// Quiz.findAll() o Quiz.find() busca datos en la tabla Quiz y se procesan en el callback del método success
// 	models.Quiz.findAll().success( function ( quiz )
// 		{
// 		res.render('quizes/question', { title: 'Quiz', pregunta: quiz[0].pregunta});
// 		});
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id
// primitiva para mostrar la pregunta buscando en la DB
// quiz.id       --> identificador de la clave maestra de la tabla Quiz
// quiz.pregunta --> campo pregunta de la tabla Quiz
// 
// exports.show = function(req, res)
// 	{
// 	// Quiz.find() busca la pregunta en la tabla Quiz y se procesan en el callback del método then
// 	models.Quiz.find( req.params.quizId ).then( function ( quiz )
// 		{
// 		res.render('quizes/show', { quiz: req.quiz });
// 		});
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id
// primitiva para mostrar la pregunta que ya ha procesado el autoload de la DB
// quiz.id       --> identificador de la clave maestra de la tabla Quiz
// quiz.pregunta --> campo pregunta de la tabla Quiz
// 
exports.show = function(req, res)
	{
	res.render('quizes/show', { quiz: req.quiz });
	};

// 
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/answer
// sin acceso a DB
// 
// exports.answer = function(req, res)
// 	{
// 	var params = { title: 'Quiz', respuesta: 'Incorrecta'};
// 	if (req.query.respuesta.toLowerCase() === 'roma') params.respuesta = 'Correcta';
// 	res.render('quizes/answer', params );
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/answer
// modifica el controlador para que busque en la DB
// 
// exports.answer = function(req, res)
// 	{
// 	models.Quiz.findAll().success( function(quiz)
// 		{
// 		var params = { title: 'Quiz', respuesta: 'Incorrecta'};
// 		if (req.query.respuesta.toLowerCase() === quiz[0].respuesta.toLowerCase() ) params.respuesta = 'Correcta';
// 		res.render('quizes/answer', params );
// 		});
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id/answer
// primitiva para comprobar la respuesta a la pregunta buscando en la DB
// quiz.id --> identificador de la clave maestra de la tabla Quiz
// 
// exports.answer = function(req, res)
// 	{
// 	models.Quiz.find( req.params.quizId ).then( function( quiz )
// 		{
// 		var params = { quiz: quiz, respuesta: 'Incorrecta'};
// 		if (req.query.respuesta.toLowerCase() === quiz.respuesta.toLowerCase() ) params.respuesta = 'Correcta';
// 		res.render('quizes/answer', params );
// 		});
// 	};
// 
///////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:id/answer
// primitiva para comprobar la respuesta a la pregunta procesada en el autoload de la DB
// quiz.id --> identificador de la clave maestra de la tabla Quiz
// 
exports.answer = function(req, res)
	{
	var params = { quiz: req.quiz, respuesta: 'Incorrecta'};
	if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase() ) params.respuesta = 'Correcta';
	res.render('quizes/answer', params );
	};
// 
///////////////////////////////////////////////////////////////////////////


