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
app.get("/api/colours", (req, res) => {
  database
    .getAllColours()
    .then((result) => {
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

// Show single colour
app.get("/api/colours/:id", (req, res) => {
  const { id } = req.params;
  database
    .getColour(id)
    .then((result) => {
      const { colour } = result;
      const templateVars = {
        colour,
      };
      res.send(templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});


// Show all existing combinations
app.get("/api/combinations", (req, res) => {
  database
    .getAllCombinations()
    .then((result) => {
      const { combinations } = result;
      const templateVars = {
        combinations,
      };
      res.send(templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Show specific combinations based on combination id
app.get("/api/combinations/:id", (req, res) => {
  const { id } = req.params;
  database
    .getCombination(id)
    .then((result) => {
      const { combination } = result;
      const templateVars = {
        combination,
      };
      res.send(templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Show combinations for a user
app.get("/api/combinations/users/:id", (req, res) => {
  const { id } = req.params;
  database
    .getCombinationsForUser(id)
    .then((result) => {
      const { combinations } = result;
      const templateVars = {
        combinations,
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
