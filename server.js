const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Rating = require("./models/rating");

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware
app.use(morgan('dev')); // Use Morgan for logging HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/restaurantDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Lab exercise data
const RESTAURANT = {
  name: "Cosmic Drinkable Teas",
  isOpen: true,
  address: "123 Lake Shore Drive, Chicago, 77777",
  phone: "1800-777-2222",
  menu: [
    {
      id: 1,
      name: "Lavender Bliss Tea",
      price: 7.89,
      rating: 4.7,
      category: "BestTeas",
      details:
        "A refreshing blend of brewed black or green tea infused with aromatic lavender, sweetened with honey, and brightened with a splash of lemon juice. Served chilled over ice, this soothing drink is a perfect balance of floral and citrus notes.",
    },
    {
      id: 2,
      name: "Strawberry Zen Oolong",
      price: 7.89,
      rating: 4.2,
      category: "BestTeas",
      details:
        "A harmonious blend of smooth oolong tea and sweet, juicy strawberries. Light, refreshing, and perfectly balanced with subtle fruity notes. Ideal for a calm, refreshing sip.",
    },
    {
      id: 3,
      name: "White Chocolate Pistachio Almond Croissants",
      price: 6.0,
      rating: 4.8,
      category: "Snackables",
      details:
        "Flaky, buttery croissants filled with creamy white chocolate, crunchy pistachios, and sliced almonds. Lightly dusted with powdered sugar for a touch of elegance.",
    },
    {
      id: 4,
      name: "Golden Cheesecake",
      price: 7.0,
      rating: 4.25,
      category: "Snackables",
      details:
        "A rich, smooth cheesecake with a velvety white chocolate topping, golden graham cracker crust, and roasted almonds, all finished with a swirl of caramel for a luxurious touch.",
    },
    {
      id: 5,
      name: "Honey Almond Crunch Topping",
      price: 2.25,
      rating: 5,
      category: "AddOns",
      details:
        "A perfect blend of toasted almonds drizzled with sweet honey and sprinkled with a light dusting of sea salt for a satisfying crunch. Adds the perfect balance of texture and flavor to any dessert!",
    },
  ],
};

// Routes
app.get("/", (req, res) => {
  res.render("home", { restaurant: RESTAURANT });
});

app.get("/menu", (req, res) => {
  res.render("menu", { restaurant: RESTAURANT, menu: RESTAURANT.menu });
});

app.get("/menu/category/:category", (req, res) => {
  const category = req.params.category;
  const validCategories = ['BestTeas', 'Snackables', 'AddOns'];
  
  if (!validCategories.includes(category)) {
    return res.status(404).send('Category not found');
  }
  
  const menuItems = RESTAURANT.menu.filter(item => item.category === category);
  res.render("category", { restaurant: RESTAURANT, menuItems, category: category.charAt(0).toUpperCase() + category.slice(1) });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
