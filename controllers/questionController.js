const Question = require('../models/question');
const Option = require('../models/option');

exports.createQuestion = async (req, res) => {
  try {
    const { text } = req.body;
    const question = new Question({ text });
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the question.' });
  }
};

exports.viewQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('options');
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the question.' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('options');
    
    if (question) {
      for (const option of question.options) {
        if (option.votes > 0) {
          return res.status(400).json({ error: 'Cannot delete question with voted options.' });
        }
        await option.remove();
      }
      await question.remove();
      res.json({ message: 'Question and its options deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Question not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the question.' });
  }
};
