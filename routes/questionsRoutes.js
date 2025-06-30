const express = require('express');
const router = express.Router();
const { createQuestion , getQuestions , getQuestion , updateQuestion , deleteQuestion } = require('../controllers/questionsController');

router.route('/').get(getQuestions)
router.route('/:id').get(getQuestion)
router.route('/').post(createQuestion)
router.route('/:id').put(updateQuestion)
router.route('/:id').delete(deleteQuestion)

module.exports = router;