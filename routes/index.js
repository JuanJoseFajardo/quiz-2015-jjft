/////////////////////////////////////////////////////////////////////////////////////
// 
// RUTAS
// 
/////////////////////////////////////////////////////////////////////////////////////


var express        = require('express');
var router         = express.Router();

var quizController    = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', function(req, res)
	{
  	res.render('index', { title: 'Quiz', errors: [] });
	});


// Autoload de comandos con :quizId
router.param('quizId',					   quizController.load);
// Autoload de comandos con :commentId
router.param('commentId',				   commentController.load);

// Definición de rutas /quizes
// 
router.get('/quizes', 			      	   quizController.index);
// GET show question
router.get('/quizes/:quizId(\\d+)',        quizController.show);
// GET answer question
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

////////////////////////////////////////////////////////////////////////////////////////////////
// only for authenticated users using the authenticacion middleware 'sessionController.loginRequired'
// that pass through the next controller if it's true (login ok)
// 
// GET new question
router.get('/quizes/new',				   sessionController.loginRequired, quizController.new);
// POST create question from form
router.post('/quizes/create',			   sessionController.loginRequired, quizController.create);
// GET edit questions
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
// PUT edit questions
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
// DELETE questions
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);
// 
////////////////////////////////////////////////////////////////////////////////////////////////


// Definición de rutas de comentarios
// 
// GET comment
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
// POST comment
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
// GET publish comment
// only for authenticated users using the authenticacion middleware 'sessionController.loginRequired'
// that pass through the next controller if it's true (login ok)
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
												 sessionController.loginRequired, commentController.publish);

// GET unpublish comment
// only for authenticated users using the authenticacion middleware 'sessionController.loginRequired'
// that pass through the next controller if it's true (login ok)
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/unpublish',
												 sessionController.loginRequired, commentController.unpublish);

// Definición de rutas author
// 
// GET author credits page
router.get('/author' , function(req, res)
	{
  	res.render('author', { title: 'Quiz', errors: [] });
	});


// Definición de rutas de sesión
// 
// --->formulario login
router.get('/login',  sessionController.new);
// --->crear sesión
router.post('/login', sessionController.create);
// --->destruir sesión
router.get('/logout', sessionController.destroy);


module.exports = router;
