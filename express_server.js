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

// Helper functions

const formatLikes = (likes = 2345) => {
  if (likes < 1000) return likes.toString();
  const rounded = Math.round(likes / 100) / 10;
  const formattedLikes = rounded + "k";
  return formattedLikes;
};

const formatSaves = (combinations) => {};

// ** User routes ** //

// Show main page
app.get("/colours", (req, res) => {
  const { user } = req.session;

  database
    .getAllCombinations()
    .then(({ combinations }) => {
      const templateVars = {
        combinations,
        user,
        active: "home"
      };
      res.render("index", templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Save your favourite - Colour picker screen
app.get("/colours/palette", (req, res) => {
  const { user } = req.session;
  if (!user) {
    console.log("This user does not exist!");
    return res.redirect("/colours");
  }
  const templateVars = {
    active: "new",
    user
  };
  res.render("new_palette", templateVars);
});

// Test users
app.get("/test", (req, res) => {
  const { user } = req.session;
  if (user) {
    console.log("You are already logged in!");
    return res.redirect("/colours");
  }
  const templateVars = {
    active: "test",
    user
  };
  res.render("test_users", templateVars);
});

// Login a user

const login = function (email, password) {
  return database.getUserWithEmail(email).then((user) => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
};
exports.login = login;

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.user = user;
      res.redirect("/colours");
    })
    .catch((e) => res.send(e));
});

// Logout

app.post("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/colours");
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
    return res.redirect("/colours");
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
      res.redirect("/colours");
    })
    .catch((e) => res.send(e));
});

// Show my colour combinations
app.get("/colours/created", (req, res) => {
  const { user } = req.session;

  if (!user) return res.redirect("/colours");

  database
    .getCombinationsForUser(user.id)
    .then(({ combinations }) => {
      const templateVars = {
        combinations,
        user,
        heading: "My Creations",
        active: "created"
      };
      res.render("my_combinations", templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Show saved combinations by a user
app.get("/combinations/users/saved", (req, res) => {
  const { user } = req.session;

  if (!user) return res.redirect("/colours");

  database
    .showSavedCombinations(user.id)
    .then((result) => {
      const { combinations } = result;
      const templateVars = {
        combinations,
        user,
        heading: "Palette Library",
        active: "saved"
      };
      res.render("my_combinations", templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Save a combination
app.post("/combinations/users/saved/", (req, res) => {
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
        if (!combination) res.redirect("/colours");
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
      if (!combination) res.redirect("/colours");
      res.send({ combination });
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// ** API Routes ** ///

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

// Show saved combinations by a user
app.get("/api/combinations/users/saved/:id", (req, res) => {
  const { id } = req.params;
  database
    .showSavedCombinations(id)
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

// Delete a combination
app.delete("/api/combinations/:id", function (req, res) {
  const { id } = req.params;
  const { user } = req.session;
  const { userID, createdBy } = req.body;
  
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

// // Update a like
// app.post("/api/likes/:id", (req, res) => {
//   const { id } = req.params;
//   database
//     .updateLikes(id)
//     .then((result) => {
//       const { combination } = result;
//       const templateVars = {
//         combination,
//       };
//       res.send(templateVars);
//     })
//     .catch((e) => {
//       console.error(e);
//       res.send(e);
//     });
// });

// Add a new combination
app.post("/api/combinations", (req, res) => {
  const { combination } = req.body;
  const { user } = req.session;

  if (!combination || !user) return res.send(400);
  const colours = combination;
  const id = user.id;
  database
    .addCombinationsForUser(id, colours)
    .then((result) => {
      const { combination } = result;
      res.redirect("/colours");
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

app.listen(PORT, () => {
  console.log(`ColourDB listening on port ${PORT}!`);
});
