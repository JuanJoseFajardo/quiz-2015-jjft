// Comments controller

// importa el modelo para poder acceder a la DB. Éste a su vez importa quiz.js
var models = require('../models/models.js');


/////////////////////////////////////////////////////////////////////////////////////
// 
// Autoload :id de comentarios
// pregarga el comentario si la ruta trae un commentId
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.load = function( req, res, next, commentId )
	{
	models.Comment.find( { where: { id: Number(commentId) } }).then( function( comment )
		{
		if ( comment )
			{
			req.comment = comment;
			next();
			}
		else
			next( new Error('No existe commentId=' + commentId) );
		}).catch( function( error )
			{
			next( error );
			});
	};


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


//////////////////////////////////////////////////////////////////////////////////////////////
// 
// PUT /quizes/:quizId/comments/:commentId/publish
// con índice temático
// 
//////////////////////////////////////////////////////////////////////////////////////////////

exports.updatePublish = function( req, res )
	{
	req.comment.publicado = true;

	req.comment.save( { fields: ["publicado"] } ).then( function()
		{
		res.redirect( '/quizes/' + req.params.quizId );
		}).catch( function( error )
			{
			next( error );
			});
	};

//////////////////////////////////////////////////////////////////////////////////////////////
// 
// PUT /quizes/:quizId/comments/:commentId/unpublish
// con índice temático
// 
//////////////////////////////////////////////////////////////////////////////////////////////

exports.updateUnpublish = function( req, res )
	{
	req.comment.publicado = false;

	req.comment.save( { fields: ["publicado"] } ).then( function()
		{
		res.redirect( '/quizes/' + req.params.quizId );
		}).catch( function( error )
			{
			next( error );
			});
	};
