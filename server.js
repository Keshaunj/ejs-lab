const express = require("express");
const app = express();
app.set("view engine", "ejs");

// Lab exercise
const RESTAURANT = {
  name: "Comsic Drinkable Teas",
  isOpen: true,
  address: "123 Lake SHore Drive, Chicago,  77777",
  phone: "1800-777-2222",
  menu: [
    {
      id: 1,
      name: "Lavender Bliss Tea",
      price: 7.89,
      rating: 4.7,
      category: "Best Teas",
      details:
        " A refreshing blend of brewed black or green tea infused with aromatic lavender, sweetened with honey, and brightened with a splash of lemon juice. Served chilled over ice, this soothing drink is a perfect balance of floral and citrus notes.",
    },
    {
      id: 2,
      name: "Strawberry Zen Oolong",
      price: 7.89,
      rating: 4.2,
      category: "Best Teas",
      details:
        " A harmonious blend of smooth oolong tea and sweet, juicy strawberries. Light, refreshing, and perfectly balanced with subtle fruity notes. Ideal for a calm, refreshing sip.",
    },
    {
      id: 3,
      name: "White Chocolate Pistachio Almond Croissants",
      price: 6.0,
      rating: 4.8,
      category: "Snackables",
      details:
        " Flaky, buttery croissants filled with creamy white chocolate, crunchy pistachios, and sliced almonds. Lightly dusted with powdered sugar for a touch of elegance.",
    },
    {
      id: 4,
      name: "Pumpkin Pi Squared",
      price: 3.14,
      rating: 5,
      category: "desserts",
      details:
        "A delightful pumpkin dessert, squared and spiced to perfection.",
    },
    {
      id: 5,
      name: "Fibonacci String Bean Fries",
      price: 11.23,
      rating: 5,
      category: "sides",
      details:
        "Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.",
    },
  ],
};

app.get("/", (req, res) => {
res.render("home",{restaurant:RESTAURANT});
});
 
app.get("/menu", (req, res) => {
    res.render("menu",{ restaurant: RESTAURANT, menu: RESTAURANT.menu});
});



app.get("/menu/category/:category", (req, res) => {
  const category = req.params.category;
  const validCategories = ['mains', 'desserts', 'sides'];
  
  if (!validCategories.includes(category)) {
    return res.status(404).send('Category not found');
  }
  
  const menuItems = RESTAURANT.menu.filter(item => item.category === category);
  res.render("category", { restaurant: RESTAURANT, menuItems, category: category.charAt(0).toUpperCase() + category.slice(1) });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
