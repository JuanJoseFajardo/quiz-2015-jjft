// Comments controller

// importa el modelo para poder acceder a la DB. Éste a su vez importa quiz.js
var models = require('../models/models.js');


/////////////////////////////////////////////////////////////////////////////////////
// 
// GET /quizes/:quizId/comments/new
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.new = function( req, res )
	{
	res.render('comments/new', { quizId: req.params.quizId, errors: [] });
	};

/////////////////////////////////////////////////////////////////////////////////////
// 
// POST /quizes/:quizId/comments
// con validación de la entrada en los campos de la tabla
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.create = function( req, res )
	{
	// crea un objeto Comment que inicializa con el req.body
	var comment = models.Comment.build( 
		{
		  texto  : req.body.comment.texto,
		  QuizId : req.params.quizId
		});

	comment.validate().then( function( err )
		{
		if ( err )
			{
			// para un error de validación
			res.render('comments/new', { comment: comment, errors: err.errors });
			}
		else
			{
			// guarda el objeto comment en DB con los campos texto del comentario
			// para evitar que en la trasacción un ManInTheMiddle añada campos adicionales al form
			comment.save().then ( function()
				{
				// redirección HTTP URL relativo a la lista de preguntas
				res.redirect('/quizes/' + req.params.quizId);
				});
			}
		}).catch( function( error )
			{
			next( error );
			});
	};
