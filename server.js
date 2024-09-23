const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import models and data
const Tea = require('./models/tea');
const teaData = require('./data/teaData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => console.error('MongoDB connection error:', err));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => res.redirect('/logTea'));

// Display logTea form
app.get('/logTea', (req, res) => res.render('logTea'));

// Submit tea data
app.post('/submitTea', async (req, res) => {
  try {
    const newTea = new Tea(req.body);
    await newTea.save();
    res.redirect('/logTea');
  } catch (error) {
    console.error('Error saving tea data:', error);
    res.status(500).send('Error saving tea data.');
  }
});

// Display tea details
app.get('/tea/:name', async (req, res) => {
  try {
    const tea = await Tea.findOne({ name: req.params.name });
    tea ? res.render('teaDetails', { tea }) : res.status(404).send('Tea not found');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving tea data.');
  }
});

// List all teas
app.get('/tea', async (req, res) => {
  try {
    const teas = await Tea.find();
    res.render('teaList', { teas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving teas.');
  }
});

// Display menu
app.get('/menu', (req, res) => {
  try {
    res.render('menu', { snackables: teaData });
  } catch (error) {
    res.status(500).send('Error retrieving menu.');
  }
});

// Display teas by category
app.get('/menu/category/:categoryName', async (req, res) => {
  try {
    const teas = await Tea.find({ category: req.params.categoryName });
    res.render('category', { teas, category: req.params.categoryName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving category.');
  }
});

// Display a message on the reviews page
app.get('/reviews', (req, res) => {
  res.render('reviews'); // Render the reviews view
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
