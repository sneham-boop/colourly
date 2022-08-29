let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

const { Pool } = require("pg");
const db = new Pool(dbParams);

const getAllCombinations = () => {
  return db
    .query(
      `SELECT combinations.id AS id, colours.value AS colour, combinations.likes AS likes, combinations.user_id
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id
      ORDER BY id;`
    )
    .then((result) => {
      const combinations = {};
      for (const row of result.rows) {
        let colour = row.colour;
        colour = colour.toUpperCase();
        colour = colour.substring(1);
        const id = row.id;
        const likes = row.likes;
        const user_id = row.user_id;
        if (combinations[id]) {
          combinations[id].colours.push(colour);
        } else {
          combinations[id] = { id, colours: [colour], likes: likes,user_id: user_id };
        }
      }
      return { combinations };
    })
    .catch((err) => console.error(err.stack));
};

const getCombination = (id) => {
  return db
    .query(
      `SELECT combinations.id AS combination, colours.value AS colour
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      WHERE combinations.id = $1
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id
      ORDER BY combination;`,
      [id]
    )
    .then((result) => {
      const combination = [];
      for (const row of result.rows) {
        combination.push(row.colour);
      }
      return { combination };
    })
    .catch((err) => console.error(err.stack));
};

const getAllColours = () => {
  return db
    .query(`SELECT * FROM colours;`)
    .then((result) => {
      const colours = [];
      for (const row of result.rows) {
        colours.push(row);
      }
      return { colours };
    })
    .catch((err) => console.error(err.stack));
};

const getColour = (id) => {
  return db
    .query(
      `SELECT * FROM colours
      WHERE colours.id = $1;`,
      [id]
    )
    .then((result) => {
      const colour = [];
      for (const row of result.rows) {
        colour.push(row);
      }
      return { colour };
    })
    .catch((err) => console.error(err.stack));
};

const getCombinationsForUser = (id) => {
  return db
    .query(
      `SELECT combinations.id AS id, colours.value AS colour, combinations.likes AS likes, users.id AS user_id
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      JOIN users ON combinations.user_id = users.id
      WHERE users.id = $1
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id, users.id
      ORDER BY id;`,
      [id]
    )
    .then((result) => {
      const combinations = {};
      for (const row of result.rows) {
        let colour = row.colour;
        colour = colour.toUpperCase();
        colour = colour.substring(1);
        const id = row.id;
        const likes = row.likes;
        const user_id = row.user_id;
        if (combinations[id]) {
          combinations[id].colours.push(colour);
        } else {
          combinations[id] = { id, colours: [colour], likes: likes, user_id:user_id };
        }
      }
      return { combinations };
    })
    .catch((err) => console.error(err.stack));
};

const updateLikes = (id) => {
  return db
    .query(
      `UPDATE combinations
      SET likes = likes + 1
      WHERE combinations.id = $1
      RETURNING *;`,
      [id]
    )
    .then((result) => {
      const combination = result.rows[0];
      return { combination };
    })
    .catch((err) => console.error(err.stack));
};

const saveCombination = (combination_id, user_id) => {
  return db
    .query(
      `INSERT INTO combinations_users (combination_id, user_id)
      VALUES ($1, $2)
      RETURNING *;`,
      [combination_id,user_id]
    )
    .then((result) => {
      console.log(result.rows[0]);
      const response = result.rows[0];
      return { response };
    })
    .catch((err) => console.error(err.stack));
};

const showSavedCombinations = (user_id) => {
  return db
    .query(
      `SELECT combinations_users.combination_id, combinations_users.user_id AS saved_by_user, colours.value
      FROM combinations_users
      JOIN colours_combinations ON combinations_users.combination_id = colours_combinations.combination_id
      JOIN colours ON colours_combinations.colour_id = colours.id
      WHERE combinations_users.user_id = $1;`,
      [user_id]
    )
    .then((result) => {
      const combinations = result.rows;
      return { combinations };
    })
    .catch((err) => console.error(err.stack));
};

const getUserWithEmail = function (email) {
  return db
    .query(
      `SELECT *
    FROM users
    WHERE email = $1`,
      [email.toLowerCase()]
    )
    .then((response) => response.rows[0])
    .catch((error) => error.message);
};

const addUser = function ({ email, password }) {
  return db
    .query(
      `INSERT INTO users (email, password)
      VALUES ($1,$2)
      RETURNING *;`,
      [email.toLowerCase(), password]
    )
    .then((response) => response.rows[0])
    .catch((error) => error.message);
};

const addCombinationsForUser = async (id, colours) => {
  const colours_lowercase = colours.map((colour) => `#${colour.toLowerCase()}`);
  let addColoursQuery = `INSERT INTO colours (value, user_id)
VALUES ('${colours_lowercase[0]}', ${id})`;
  for (let i = 1; i < colours_lowercase.length; i++) {
    addColoursQuery += `, ('${colours_lowercase[i]}', ${id}) `;
  }
  addColoursQuery += "RETURNING colours.id;";

  try {
    const result = await db.query(addColoursQuery);
    const colour_ids = result.rows.map((row) => row.id);
    try {
      const result = await db.query(
        `INSERT INTO combinations (user_id, likes)
      VALUES ($1, 0) RETURNING combinations.id;`,
        [id]
      );
      const combination_id = result.rows[0].id;
      try {
        let addColourCombinationQuery = `INSERT INTO colours_combinations (colour_id, combination_id)
                  VALUES (${colour_ids[0]}, ${combination_id})`;
        for (let i = 1; i < colour_ids.length; i++) {
          addColourCombinationQuery += `, (${colour_ids[i]}, ${combination_id}) `;
        }
        addColourCombinationQuery += "RETURNING *;";

        const result = await db.query(addColourCombinationQuery);
        const combination = result.rows;
        return { combination };
      } catch (err) {
        return console.error(
          "Error adding a new colour combination",
          err.stack
        );
      }
    } catch (err) {
      return console.error("Error adding a new combination id", err.stack);
    }
  } catch (err_1) {
    return console.error("Error adding new colours", err_1.stack);
  }
};

const deleteCombination = (id) => {
  return db
    .query(`DELETE FROM combinations 
    WHERE combinations.id = $1
    RETURNING *;`,
    [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => console.error(err.stack));
};

module.exports = {
  db,
  getAllCombinations,
  getCombination,
  getAllColours,
  getColour,
  getCombinationsForUser,
  updateLikes,
  getUserWithEmail,
  addUser,
  addCombinationsForUser,
  deleteCombination,
  showSavedCombinations
};
