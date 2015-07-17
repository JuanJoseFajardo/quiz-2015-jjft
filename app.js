var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
// importa el módulo express-partials
var partials       = require('express-partials');
// importar paquete para cambiar la petición POST por PUT
var methodOverride = require('method-override');
var routes         = require('./routes/index');
// no se hace servir el enrutador users que viene por defecto
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views'      , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// invoca el módulo express-partials
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////////
//
// app.use(bodyParser.urlencoded({ extended: false }));
// reprogramar el middleware para construir correctamente un objeto quiz
// con propiedades 'pregunta' y 'respuesta' extraídas de los nombres
// de los parámetros quiz[pregunta] y quiz[respuesta] que se convierten
// en propiedades del objeto quiz. 
// name="quiz[pregunta]" y name="quiz[respuesta]" utilizan una notación pseudo JSON
// que permite indicar que son propiedades de un objeto quiz.
// El middleware bodyparser.urlencoded(..) los analiza correctamente
// y genera el objeto req.body.quiz siempre que quitemos el parámetro de configuración
// {extended: false} que express-generator incluyo cuando generó el proyecto
// 
app.use(bodyParser.urlencoded());
// 
////////////////////////////////////////////////////////////////////////
// 
app.use(cookieParser());
// instala middlware para cambiar la petición POST por PUT
// '_method' indica el nombre del parámetro utilizado para encapsular el método (edit.ejs)
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// no se hace servir el enrutador users que viene por defecto
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
