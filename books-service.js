// books-service.js
// Simple API to demonstrate fetch() and Promises

console.log("A");

const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const LINE_SEP = "\n";
const FIELD_SEP = "|";
const CATEGORY_POS = 2;
const YEAR_POS = 3;
const PRICE_POS = 4;
const TITLE_POS = 0;
const AUTHOR_POS = 1;

let fileData = fs.readFileSync("books.txt", 'utf8');
let lines = fileData.split(LINE_SEP);
// console.log(lines.length); //DEBUG
//let itemData = lines[0].split(FIELD_SEP); //DEBUG

// get books data inro  array of per-book structures
let books = [];
for (const line of lines) {
   let itemData = line.split(FIELD_SEP);
   let item = {};
   item.category = itemData[CATEGORY_POS];
   item.year = itemData[YEAR_POS];
   item.price = itemData[PRICE_POS];
   item.title = itemData[TITLE_POS];
   item.author = itemData[AUTHOR_POS];
   books.push(item);
}

 /* { category: "computers", year: 2021, price: 45.0, title: "Learning JavaScript", author: "A. Dev" },
  { category: "computers", year: 2018, price: 59.0, title: "Intro to Databases", author: "B. Query" },
  { category: "cooking",   year: 2010, price: 22.0, title: "Breakfast for Dinner", author: "Amanda Camp" },
  { category: "cooking",   year: 2015, price: 30.0, title: "21 Burgers for the 21st Century", author: "Stuart Reges" },
  { category: "finance",   year: 2020, price: 18.5, title: "Personal Finance 101", author: "C. Budget" },
*/

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
