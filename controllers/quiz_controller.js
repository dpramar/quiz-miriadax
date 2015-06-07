var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(function(quiz) {
    if(quiz) {
      req.quiz = quiz;
      next();
    } else { next(new Error('No existe quizId=' + quizId));}
  })
  .catch(function(error) {next(error);});
};

exports.index = function(req, res) {
  search = req.query.search;
  if(search) {
    search = search.replace(/\s/g,"%");
    models.Quiz.findAll({where: ["pregunta LIKE '%"+search+"%'"], order: 'pregunta ASC'}).then(function(quizes){
      res.render('quizes/index', {quizes: quizes});  
    })
    .catch(function(error) {next(error);});
  } else {
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index', {quizes: quizes});  
    })
    .catch(function(error) {next(error);});
  }
};

exports.show = function(req, res) {
  res.render('quizes/show', {quiz: req.quiz});  
};

exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};