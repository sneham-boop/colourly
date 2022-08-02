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
      `SELECT combinations.id AS id, colours.value AS colour, combinations.likes AS likes
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
        if (combinations[id]) {
          combinations[id].colours.push(colour);
        } else {
          combinations[id] = { id, colours: [colour], likes: likes };
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
      `SELECT combinations.id AS combination, colours.value AS colour, users.id AS user_id
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      JOIN users ON combinations.user_id = users.id
      WHERE users.id = $1
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id, users.id
      ORDER BY combination;`,
      [id]
    )
    .then((result) => {
      const combinations = [];
      for (const row of result.rows) {
        combinations.push(row);
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

module.exports = {
  db,
  getAllCombinations,
  getCombination,
  getAllColours,
  getColour,
  getCombinationsForUser,
  updateLikes 
};
