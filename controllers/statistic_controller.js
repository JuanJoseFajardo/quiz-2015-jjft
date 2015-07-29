// Questions and answers controller

// importa el modelo para poder acceder a la DB. Éste a su vez importa quiz.js
var models = require('../models/models.js');


///////////////////////////////////////////////////////////////////////////
// 
// GET /statistics
// obtiene una lista de todas las estadisticas de quiz con gestión de errores
// 
/////////////////////////////////////////////////////////////////////////////////////

exports.index = function ( req, res )
	{
	var quizStats       = {};
	var condPublished   = { where: { publicado: true  }};
	var condUnpublished = { where: { publicado: false }};
	// var buscarPreguntasNoComentarios = {
	// 	distinct: true,
 // 		include: [{
 // 					model: models.Comment,
 //                    required: false,
 //                    where : { QuizId : null }
 //        		 }]
 //    	};
	// models.Quiz.count( buscarPreguntasNoComentarios ).then( function( numQuizes )

	models.Quiz.count().then( function( numQuizes )
		{
		quizStats.numQuizes = numQuizes;
		models.Comment.countComment().then( function( numComments )
			{
			quizStats.numComments = numComments;
			models.Comment.count( condPublished ).then( function( numCommentsPublish )
				{
				quizStats.numCommentsPublish = numCommentsPublish;
				models.Comment.count( condUnpublished ).then( function( numCommentsUnpublish )
					{
					quizStats.numCommentsUnpublish = numCommentsUnpublish;
					models.Comment.countCommentedQuizes().then( function( numQuizesWithComments )
						{
						quizStats.numCommentsXQuiz         = (quizStats.numComments/quizStats.numQuizes).toFixed(2);
						quizStats.numQuizesWithComments    = numQuizesWithComments;
						quizStats.numQuizesWithoutComments = quizStats.numQuizes - numQuizesWithComments;
						res.render('statistics/index', { quizStats: quizStats, errors: [] });
						}).catch( function( error )
							{
							next( error );
							});
					});
				});
			});
		});
	};

