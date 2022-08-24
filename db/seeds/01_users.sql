-- Create a user
INSERT INTO users (email, password)
VALUES ('sneha@sneha.com','$2a$10$r9wYh1lcViQBfeIF13wUs.JSD7jdk.l0XLlBdySc.3FW/Z8dM2Z2e'),
('bill@bill.com', '$2a$10$r9wYh1lcViQBfeIF13wUs.JSD7jdk.l0XLlBdySc.3FW/Z8dM2Z2e');

-- Add a colour
INSERT INTO colours (value, user_id)
VALUES ('#26547c', 1),
('#ef476f', 1),
('#ffd166', 1),
('#fed700', 1),
('#21b0fe', 1),
('#e94f37', 1),
('#009fb7', 1), 
('#fed766', 1),
('#fe4a49', 1),
('#f87060', 2),
('#ffbe0b', 2),
('#ff6978', 2);

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

INSERT INTO combinations_users (combination_id, user_id)
VALUES (1, 2),
(1, 1),
(2, 1),
(5, 2),
(5, 2);