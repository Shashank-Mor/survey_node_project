const asyncHandler = require('express-async-handler');
const Question = require('../models/questionsModel');

//@desc Get all questions
//@route GET /api/questions
//@access Private

const getQuestions = asyncHandler(async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const questions = await Question.find().lean();
        const formatted = questions.map(q => ({
            id: q._id,
            text: q.text[lang] || q.text['en'] || 'Translation unavailable',
            options: q.options.map(opt => ({
                id: opt.id,
                text: opt.text[lang] || opt.text['en'] || 'Translation unavailable',
                isCorrect: opt.isCorrect
            }))
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
})

//@desc Create New question
//@route POST /api/questions
//@access Private

const createQuestion = asyncHandler(async (req, res) => {
  try{
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: 'Error creating question', error: error.message });
  }
})

//@desc Get Question
//@route GET /api/questions/:id
//@access Private

const getQuestion = asyncHandler(async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const question = await Question.findById(req.params.id).lean();
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json({
            id: question._id,
            text: question.text[lang] || question.text['en'] || 'Translation unavailable',
            options: question.options.map(opt => ({
                id: opt.id,
                text: opt.text[lang] || opt.text['en'] || 'Translation unavailable',
                isCorrect: opt.isCorrect
            }))
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching question', error: err.message });
    }
})

//@desc Update question
//@route PUT /api/questions/:id
//@access Private

const updateQuestion = asyncHandler(async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json({ id: question._id, message: 'Question updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating question', error: err.message });
    }
})

//@desc Delete Question
//@route DELETE /api/questions/:id
//@access Private

const deleteQuestion = asyncHandler(async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting question', error: err.message });
    }
})

module.exports = {
  getQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion
}