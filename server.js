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

// ** User routes ** //

// Show home page
app.get("/colourly", (req, res) => {
  const { user } = req.session;

  database
    .getAllCombinations()
    .then(({ combinations }) => {
      const templateVars = {
        combinations,
        user,
        active: "home",
      };
      res.render("index", templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Redirect to home
app.get("/", (req, res) => {
  res.redirect("/colourly");
});

app.get("/home", (req, res) => {
  res.redirect("/colourly");
});

// Show page for colour picker
app.get("/colourly/combination/new", (req, res) => {
  const { user } = req.session;
  if (!user) {
    return res.redirect("/colourly");
  }
  const templateVars = {
    active: "new",
    user,
  };
  res.render("new_palette", templateVars);
});

// Show my colour combinations
app.get("/colourly/combinations/me", (req, res) => {
  const { user } = req.session;

  if (!user) return res.redirect("/colourly");

  database
    .getCombinationsForUser(user.id)
    .then(({ combinations }) => {
      const templateVars = {
        combinations,
        user,
        heading: "My Creations",
        subHeading: "Would you like to create a new colour palette?",
        redirectLink: "/colourly/combination/new",
        buttonText: "Create",
        active: "created",
      };
      res.render("my_combinations", templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Show saved combinations by a user
app.get("/colourly/combinations/saved", (req, res) => {
  const { user } = req.session;

  if (!user) return res.redirect("/colourly");

  database
    .showSavedCombinations(user.id)
    .then((result) => {
      const { combinations } = result;
      const templateVars = {
        combinations,
        user,
        heading: "Palette Library",
        subHeading:
          "Would you like to add another colour palette to your library?",
        redirectLink: "/colourly",
        buttonText: "See all available",
        active: "saved",
      };
      res.render("my_combinations", templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Save a combination
app.post("/colourly/combinations", (req, res) => {
  const { user } = req.session;
  const { id, save } = req.body;
  if (!user)
    return res
      .status(400)
      .send("User must log in prior to saving a combination.");

  // Save
  if (save === "true") {
    database
      .saveCombination(id, user.id)
      .then(({ combination }) => {
        if (!combination) res.redirect("/colourly");
        res.send({ combination });
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
    return;
  }

  // Unsave
  database
    .unsaveCombination(id, user.id)
    .then(({ combination }) => {
      if (!combination) res.redirect("/colourly");
      res.send({ combination });
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Test users
app.get("/colourly/test", (req, res) => {
  const { user } = req.session;
  if (user) {
    console.log("You are already logged in!");
    return res.redirect("/colourly");
  }
  const templateVars = {
    active: "test",
    user,
  };
  res.render("test_users", templateVars);
});

// Login a user
const login = function (email, password) {
  return database.getUserWithEmail(email).then(({ user, error }) => {
    if (error) return { error };
    if (bcrypt.compareSync(password, user.password)) {
      return { user };
    }
    return { error: "Password does not match!" };
  });
};
exports.login = login;

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(({ user, error }) => {
      if (!user || error) {
        res.redirect("/colourly");
        return;
      }
      req.session.user = user;
      res.redirect("/colourly");
    })
    .catch((e) => res.send(e));
});

// Logout
app.post("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/colourly");
});

// Register a new user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const message = {
    user: undefined,
    text: "",
  };

  if (email === "" || password === "") {
    message.text = "Enter a valid email and/or password.";
    return res.redirect("/colourly");
  }

  // Add user if info valid
  const user = {
    email,
    password: hashedPassword,
  };

  database
    .addUser(user)
    .then((user) => {
      req.session.user = user;
      res.redirect("/colourly");
    })
    .catch((e) => res.send(e));
});

// FAQ page render
app.get("/colourly/faq", (req, res) => {
  const { user } = req.session;

  const templateVars = {
    active: "faq",
    user,
  };

  res.render("faq", templateVars);
});

// ** API Routes ** ///

// Colours (Only Read from CRUD)
// Get all colours
app.get("/api/colours", (req, res) => {
  database
    .getAllColours()
    .then((result) => {
      const { colours } = result;

      if (!colours) return res.status(500).send("Could not find colours");

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

// Get single colour
app.get("/api/colours/:id", (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res
      .status(400)
      .send(`${id} is not a number. Please enter a colour id.`);

  database
    .getColour(id)
    .then((result) => {
      const { colour } = result;

      if (colour.length === 0)
        return res.status(500).send(`Could not find colour with id: ${id}`);

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

// Users (Only Read from CRUD)
// Get all users
app.get("/api/users", (req, res) => {
  database
    .getAllUsers()
    .then((result) => {
      const { users } = result;

      if (!users) return res.status(500).send("Could not find users.");

      const templateVars = {
        users,
      };
      res.send(templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Get user
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res
      .status(400)
      .send(`${id} is not a number. Please enter a valid user id.`);

  database
    .getUser(id)
    .then((result) => {
      const { user } = result;

      if (user.length === 0)
        return res.status(500).send(`Could not find user with id: ${id}`);

      const templateVars = {
        user,
      };
      res.send(templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Combinations (Only Create, Read & Delete from CRUD)
// Get all combinations
app.get("/api/combinations", (req, res) => {
  database
    .getAllCombinations()
    .then((result) => {
      const { combinations } = result;

      if (!combinations)
        return res.status(500).send("Could not find combinations.");

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

// Get single combination
app.get("/api/combinations/:id", (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res
      .status(400)
      .send(`${id} is not a number. Please enter a valid combination id.`);

  database
    .getCombination(id)
    .then((result) => {
      const { combination } = result;

      if (combination.length === 0)
        return res
          .status(500)
          .send(`Could not find combination with id: ${id}`);

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

// Get all combinations created by a user
app.get("/api/combinations/users/:id", (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res
      .status(400)
      .send(`${id} is not a number. Please enter a valid user id.`);

  database
    .getCombinationsForUser(id)
    .then((result) => {
      const { combinations } = result;
      const combinationIDs = Object.keys(combinations);

      if (combinationIDs.length === 0)
        return res
          .status(500)
          .send(`Could not find any combinations for user id: ${id}`);

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

// Get all combinations saved by a user
app.get("/api/combinations/saved/users/:id", (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res
      .status(400)
      .send(`${id} is not a number. Please enter a valid user id.`);

  database
    .showSavedCombinations(id)
    .then((result) => {
      const { combinations } = result;

      const combinationIDs = Object.keys(combinations);
      if (combinationIDs.length === 0)
        return res
          .status(500)
          .send(`Could not find any combinations for user id: ${id}`);

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

// Delete a combination
app.delete("/api/combinations/:id", function (req, res) {
  const { id } = req.params;

  if (!parseInt(id))
    return res
      .status(400)
      .send(`${id} is not a number. Please enter a valid combination id.`);

  const { user } = req.session;
  const { userID, createdBy } = req.body;

  // Check authentication
  if (userID !== createdBy || user.id !== parseInt(createdBy))
    return res.send("Not allowed. Please log in with proper credentials.");

  database
    .deleteCombination(id)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Create a new combination
app.post("/api/combinations", (req, res) => {
  const { combination } = req.body;
  const { user } = req.session;

  // Check authentication
  if (!combination || !user) return res.send(400);
  const colours = combination;
  const id = user.id;
  database
    .addCombinationsForUser(id, colours)
    .then((result) => {
      const { combination } = result;
      if (combination) res.send({ redirectLink: "/colourly/combinations/me" });
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

app.listen(PORT, () => {
  console.log(`ColourDB listening on port ${PORT}!`);
});
