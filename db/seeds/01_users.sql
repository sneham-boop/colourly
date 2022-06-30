-- Create a user
INSERT INTO users (email, password)
VALUES ('sneha@sneha.com','sneha');

-- Add a colour
INSERT INTO colours (value, user_id)
VALUES ('1245', 1),
('34567', 1),
('45643', 1);

-- Add a new combination
INSERT INTO combinations (colour_1, colour_2, colour_3, user_id)
VALUES (1, 2, 3, 1);