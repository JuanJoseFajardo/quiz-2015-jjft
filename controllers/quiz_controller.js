// Questions and answers controller

// GET /quizes/question

exports.question = function(req, res)
	{
	res.render('quizes/question', { title: 'Quiz', pregunta: 'Capital de Italia'});
	};

// GET /quizes/answer

exports.answer = function(req, res)
	{
	var params = { title: 'Quiz', respuesta: 'Incorrecta'};
	if (req.query.respuesta.toLowerCase() === 'roma') params.respuesta = 'Correcta';
	res.render('quizes/answer', params );
	};

