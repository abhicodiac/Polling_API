const Option = require('../models/option');

exports.createOption = async (req, res) => {
  try {
    const { text, questionId } = req.body;
    const option = new Option({ text, question: questionId });
    await option.save();
    res.json(option);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the option.' });
  }
};

exports.addVote = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    if (option) {
      option.votes++;
      await option.save();
      res.json(option);
    } else {
      res.status(404).json({ error: 'Option not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a vote.' });
  }
};

exports.deleteOption = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    if (option) {
      if (option.votes > 0) {
        return res.status(400).json({ error: 'Cannot delete option with votes.' });
      }
      await option.remove();
      res.json({ message: 'Option deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Option not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the option.' });
  }
};
