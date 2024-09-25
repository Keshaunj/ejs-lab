const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TeaData = require('./data/teaData'); // Ensure the path is correct based on your project structure
dotenv.config();

// Import the Tea model
const Tea = require('./models/tea');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.set('view engine', 'ejs'); // Set EJS as the template engine

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
    .catch(err => console.error('MongoDB connection error:', err));

// Home route
app.get('/', (req, res) => res.redirect('/logTea'));

// Display logTea form
app.get('/logTea', (req, res) => res.render('logTea'));

// Submit tea data
app.post('/submitTea', async (req, res) => {
    try {
        const newTea = new Tea(req.body);
        await newTea.save();
        res.redirect('/reviews'); // Redirect to reviews page after submitting
    } catch (error) {
        console.error('Error saving tea data:', error);
        res.status(500).send('Error saving tea data.');
    }
});

// Display all tea reviews
app.get('/reviews', async (req, res) => {
    try {
        const teas = await Tea.find(); // Retrieve all teas from the database
        res.render('newreview', { teas }); // Render the newreview view with the retrieved teas
    } catch (error) {
        console.error('Error retrieving teas:', error);
        res.status(500).send('Error retrieving teas.');
    }
});

// Handle delete tea request
app.delete('/reviews/:id', async (req, res) => {
    try {
        await Tea.findByIdAndDelete(req.params.id); // Delete the tea by its ID
        res.status(200).send('Tea deleted successfully.');
    } catch (error) {
        console.error('Error deleting tea:', error);
        res.status(500).send('Error deleting tea.');
    }
});

// Display the menu with best teas and snackables
app.get('/menu', async (req, res) => {
    try {
        const teas = await Tea.find(); // Retrieve all teas from the database

        // Filter to get best teas and snackables from TeaData
        const bestTeas = TeaData.filter(item => item.category === 'BestTeas');
        const snackables = TeaData.filter(item => item.category === 'Snackables');

        // Render the menu view with teas and static data
        res.render('menu', { teas, bestTeas, snackables });
    } catch (error) {
        console.error('Error retrieving teas:', error);
        res.status(500).send('Error retrieving teas.'); // Send a 500 error response
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
