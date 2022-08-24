DROP TABLE IF EXISTS colours CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS combinations CASCADE;
DROP TABLE IF EXISTS colours_combinations CASCADE;
DROP TABLE IF EXISTS combinations_users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE colours (
  id SERIAL PRIMARY KEY NOT NULL,
  value VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE combinations (
  id SERIAL PRIMARY KEY NOT NULL,
  likes INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE colours_combinations (
  id SERIAL PRIMARY KEY NOT NULL,
  colour_id INTEGER REFERENCES colours(id) ON DELETE CASCADE,
  combination_id INTEGER REFERENCES combinations(id) ON DELETE CASCADE
);

CREATE TABLE combinations_users (
  id SERIAL PRIMARY KEY NOT NULL,
  combination_id INTEGER REFERENCES combinations(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)