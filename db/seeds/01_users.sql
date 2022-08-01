-- Create a user
INSERT INTO users (email, password)
VALUES ('sneha@sneha.com','sneha'),
('bill@bill.com', 'bill');

-- Add a colour
INSERT INTO colours (value, user_id)
VALUES ('#001219', 1),
('#005f73', 1),
('#0a9396', 1),
('#94d2bd', 1),
('#e9d8a6', 1),
('#ee9b00', 1),
('#ca6702', 1),
('#bb3e03', 1),
('#ae2012', 1),
('#9b2226', 2),
('#8e9aaf', 2),
('#cbc0d3', 2);

-- Add a new combination
INSERT INTO combinations (user_id, likes)
VALUES (1, 4567),
(1, 34293),
(1, 3234),
(1, 4757),
(2, 4882),
(2, 4324);

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
(11, 6),
(6, 6);