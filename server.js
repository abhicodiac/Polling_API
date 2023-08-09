const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection setup
mongoose.connect('mongodb+srv://abhishekyadav3032002:y1LtjCDnXcWQm0yd@cluster0.0eymfgl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', ()=>{
  console.log("successfully connected to database : mongoDB");
});
// Middleware
app.use(bodyParser.json());

// Import and use your routes
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');

app.use('/questions', questionRoutes);
app.use('/options', optionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
