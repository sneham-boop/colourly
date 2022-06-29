-- -- Show all colour combinations
-- SELECT * 
-- FROM combinations;

-- -- Show only a users colour combinations
-- SELECT * FROM combinations
-- JOIN users ON users.id = combinations.user_id
-- WHERE users.id = 1;

-- -- Show all existing colours
-- SELECT * FROM colours;

-- -- Create a user
-- INSERT INTO users (email, password)
-- VALUES ("sneha@sneha.com","sneha");

-- -- Add a colour
-- INSERT INTO colours (value, users_id)
-- VALUES (12345, 1);

-- -- Add a new combination
-- INSERT INTO combinations (colour_1, colour_2, colour_3, users_id)
-- VALUES (12345, 34567, 45643, 1);

-- -- Add a like
-- UPDATE combinations
-- SET likes = 45
-- WHERE combinations.id = 1;