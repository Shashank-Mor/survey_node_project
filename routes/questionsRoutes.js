const express = require('express');
const router = express.Router();
const { createQuestion, getQuestions, getQuestion, updateQuestion, deleteQuestion, validateQuestion } = require('../controllers/questionsController');

router.route('/')
    .get(getQuestions)
    .post(validateQuestion, createQuestion);
router.route('/:id')
    .get(getQuestion)
    .put(validateQuestion, updateQuestion)
    .delete(deleteQuestion);

module.exports = router;