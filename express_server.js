// **************************************************************************//
// Main server //
// **************************************************************************//

// ** Setup ** //
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();
app.set("view engine", "ejs");
const PORT = 3300;
app.use(express.static("public"));

// ** Middleware ** //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 30 * 60 * 1000, // 30 minutes session
  })
);

// Import db
const database = require("./lib/db");
const { db } = database;

// ** Routes ** //

// Show all existing colours
app.get("/colours", (req, res) => {
  database
    .getAllCombinations()
    .then((result) => {
      console.log(result);
      const { colours } = result;
      const templateVars = {
        colours,
      };
      res.send(templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

app.listen(PORT, () => {
  console.log(`ColourDB listening on port ${PORT}!`);
});
