const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import the Tea model
const Tea = require('./models/tea'); // Make sure the path is correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.post('/submitTea', async (req, res) => {
  const { name, price, rating, category, details } = req.body;

  try {
    const newTea = new Tea({ name, price, rating, category, details });
    await newTea.save();
    res.redirect('/logTea');
  } catch (error) {
    console.error('Error saving tea data:', error);
    res.status(500).send('Error saving tea data to the database.');
  }
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/logTea');
});

app.get('/logTea', (req, res) => {
  res.render('logTea');
});
// Route to display details of a specific tea
app.get('/tea/:name', async (req, res) => {
  const { name } = req.params;

  try {
    // Find the tea by name by One
    const tea = await Tea.findOne({ name });
    
    if (tea) {
      res.render('teaDetails', { tea });
    } else {
      res.status(404).send('Tea not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving tea data.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
