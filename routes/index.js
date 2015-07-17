var express        = require('express');
var router         = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res)
	{
  	res.render('index', { title: 'Quiz', errors: [] });
	});

//////////////////////////////////////////////////////////////////////////
// 
// GET question page
// router.get('/quizes/question', quizController.question);
// 
// GET answer page
// router.get('/quizes/answer'  , quizController.answer);
// 
//////////////////////////////////////////////////////////////////////////

// Autoload de comandos con :quizId
router.param('quizId',					   quizController.load);

// Definición de rutas /quizes
router.get('/quizes', 			      	   quizController.index);
// GET show question
router.get('/quizes/:quizId(\\d+)',        quizController.show);
// GET answer question
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// GET edit questions
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
// PUT edit questions
router.put('/quizes/:quizId(\\d+)',        quizController.update);
// GET new question
router.get('/quizes/new',				   quizController.new);
// POST create question from form
router.post('/quizes/create',			   quizController.create);




// GET author credits page
router.get('/author' , function(req, res)
	{
  	res.render('author', { title: 'Quiz', errors: [] });
	});


module.exports = router;
