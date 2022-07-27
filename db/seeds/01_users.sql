-- Create a user
INSERT INTO users (email, password)
VALUES ('sneha@sneha.com','sneha');

-- Add a colour
INSERT INTO colours (value, user_id)
VALUES ('red', 1),
('orange', 1),
('blue', 1),
('green', 1),
('yellow', 1),
('purple', 1),
('white', 1),
('dark green', 1),
('light green', 1);

-- Add a new combination
INSERT INTO combinations (user_id)
VALUES (1),
(1),
(1),
(1);

-- Add new colours_combinations
INSERT INTO colours_combinations (colour_id, combination_id)
VALUES (1, 1),
(2, 1),
(3, 1),
(5, 2),
(6, 2),
(2, 2),
(4, 3),
(9, 3),
(6, 3),
(1, 4),
(9, 4),
(8, 4);