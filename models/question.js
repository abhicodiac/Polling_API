const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
});

module.exports = mongoose.model('Question', questionSchema);
