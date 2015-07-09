// Questions and answers controller

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// importa el modelo para poder acceder a la DB. Éste a su vez importa quiz.js
var models = require('../models/models.js');
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// GET /quizes/question
// sin acceso a DB

// exports.question = function(req, res)
// 	{
// 	res.render('quizes/question', { title: 'Quiz', pregunta: 'Capital de Italia'});
// 	};

// GET /quizes/question
// modifica el controlador para que busque en la DB

exports.question = function(req, res)
	{
	// Quiz.findAll() o Quiz.find() busca datos en la tabla Quiz y se procesan en el callback del método success
	models.Quiz.findAll().success( function ( quiz )
		{
		res.render('quizes/question', { title: 'Quiz', pregunta: quiz[0].pregunta});
		});
	};

// GET /quizes/answer
// sin acceso a DB

// exports.answer = function(req, res)
// 	{
// 	var params = { title: 'Quiz', respuesta: 'Incorrecta'};
// 	if (req.query.respuesta.toLowerCase() === 'roma') params.respuesta = 'Correcta';
// 	res.render('quizes/answer', params );
// 	};


// GET /quizes/answer
// modifica el controlador para que busque en la DB

exports.answer = function(req, res)
	{
	models.Quiz.findAll().success( function(quiz)
		{
		var params = { title: 'Quiz', respuesta: 'Incorrecta'};
		if (req.query.respuesta.toLowerCase() === quiz[0].respuesta.toLowerCase() ) params.respuesta = 'Correcta';
		res.render('quizes/answer', params );
		});
	};
