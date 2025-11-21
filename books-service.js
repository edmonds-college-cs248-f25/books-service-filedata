// books-service.js
// Simple API to demonstrate fetch() and Promises

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy data
const books = [
  { category: "computers", year: 2021, price: 45.0, title: "Learning JavaScript", author: "A. Dev" },
  { category: "computers", year: 2018, price: 59.0, title: "Intro to Databases", author: "B. Query" },
  { category: "cooking",   year: 2010, price: 22.0, title: "Breakfast for Dinner", author: "Amanda Camp" },
  { category: "cooking",   year: 2015, price: 30.0, title: "21 Burgers for the 21st Century", author: "Stuart Reges" },
  { category: "finance",   year: 2020, price: 18.5, title: "Personal Finance 101", author: "C. Budget" },
];

// Precompute unique categories
const categories = [...new Set(books.map(b => b.category))];

// Enable CORS so student fetch() calls from the browser work easily
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Root route: either list categories or books by category
app.get("/", (req, res) => {
  const category = req.query.category;
  if (!category) {
    res.json({ categories });
  } else {
    const filtered = books.filter(b => b.category === category);
    res.json({ books: filtered });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Books service listening on port ${PORT}`);
});
