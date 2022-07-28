-- Create a user
INSERT INTO users (email, password)
VALUES ('sneha@sneha.com','sneha'),
('bill@bill.com', 'bill');

-- Add a colour
INSERT INTO colours (value, user_id)
VALUES ('reeeeeed', 1),
('orange', 1),
('blue', 1),
('green', 1),
('yellow', 1),
('purple', 1),
('white', 1),
('dark green', 1),
('light green', 1),
('white', 2),
('dark green', 2),
('light green', 2);

-- Add a new combination
INSERT INTO combinations (user_id)
VALUES (1),
(1),
(1),
(1),
(2),
(2);

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
(8, 4),
(10, 5),
(11, 5),
(12, 5),
(10, 6),
(12, 6),
(11, 6);