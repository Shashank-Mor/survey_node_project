const asyncHandler = require('express-async-handler');
const Question = require('../models/questionsModel');

// Validation middleware
const validateQuestion = (req, res, next) => {
    const { text, options } = req.body;
    if (!text || typeof text !== 'object' || !options || options.length !== 4) {
        return res.status(400).json({ message: 'Question must have text as an object and exactly 4 options' });
    }
    if (!text['en'] || options.some(opt => !opt.text['en'])) {
        return res.status(400).json({ message: 'English translation is required' });
    }
    const hasCorrectAnswer = options.some(opt => opt.isCorrect);
    if (!hasCorrectAnswer) {
        return res.status(400).json({ message: 'At least one option must be correct' });
    }
    next();
};

//@desc Get all questions
//@route GET /api/questions
//@access Private
const getQuestions = asyncHandler(async (req, res) => {
    const lang = req.query.lang || 'en';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const questions = await Question.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
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
});

//@desc Create New question
//@route POST /api/questions
//@access Private
const createQuestion = asyncHandler(async (req, res) => {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({
        id: question._id,
        text: question.text,
        options: question.options,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt
    });
});

//@desc Get Question
//@route GET /api/questions/:id
//@access Private
const getQuestion = asyncHandler(async (req, res) => {
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
});

//@desc Update question
//@route PUT /api/questions/:id
//@access Private
const updateQuestion = asyncHandler(async (req, res) => {
    const updateFields = { updatedAt: Date.now() };
    if (req.body.text) updateFields.text = req.body.text;
    if (req.body.options) updateFields.options = req.body.options;
    const question = await Question.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true, runValidators: true }
    );
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({
        id: question._id,
        text: question.text,
        options: question.options,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt
    });
});

//@desc Delete Question
//@route DELETE /api/questions/:id
//@access Private
const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted', id: req.params.id });
});

module.exports = {
    getQuestions,
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    validateQuestion
};