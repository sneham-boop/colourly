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
('#ff6978', 2),
('#f08080', 1),
('#f4978e', 1),
('#f8ad9d', 1),
('#fbc4ab', 1),
('#fbc4ab', 1),
('#ffdab9', 1), 
('#355070', 1),
('#6d597a', 1),
('#b56576', 2),
('#eaac8b', 2),
('#e56b6f', 2);

-- Add a new combination
INSERT INTO combinations (user_id, likes)
VALUES (1, 4567),
(1, 34293),
(1, 3234),
(1, 4757),
(2, 4882),
(2, 4324),
(1, 4567),
(1, 34293),
(1, 3234),
(1, 4757),
(2, 4882),
(2, 4324),
(1, 4567),
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
(5, 1),
(6, 1),
(2, 2),
(4, 2),
(9, 2),
(6, 2),
(1, 2),
(9, 3),
(8, 3),
(10, 3),
(11, 3),
(12, 3),
(10, 4),
(12, 4),
(11, 4),
(6, 4),
(5, 4),
(2, 5),
(6, 5),
(4, 5),
(9, 5),
(6, 5),
(1, 6),
(9, 6),
(8, 6),
(10, 6),
(11, 6),
(12, 7),
(10, 7),
(12, 7),
(11, 7),
(5, 7),
(6, 8),
(2, 8),
(4, 8),
(9, 8),
(6, 8),
(1, 9),
(9, 9),
(8, 9),
(10, 9),
(11, 9),
(1, 10),
(2, 10),
(3, 10),
(5, 10),
(6, 10),
(1, 11),
(2, 11),
(3, 11),
(5, 11),
(6, 11),
(2, 12),
(4, 12),
(9, 12),
(6, 12),
(1, 12),
(9, 13),
(8, 13),
(10, 13),
(11, 13),
(12, 13),
(10, 14),
(12, 14),
(11, 14),
(6, 14),
(5, 14),
(2, 15),
(6, 15),
(4, 15),
(9, 15),
(6, 15),
(1, 16),
(20, 16),
(1, 16),
(23, 16),
(11, 16),
(12, 17),
(16, 17),
(17, 17),
(18, 17),
(19, 17),
(19, 18),
(20, 18),
(21, 18),
(22, 18),
(23, 18);

INSERT INTO combinations_users (combination_id, user_id)
VALUES (1, 2),
(1, 1),
(2, 1),
(5, 2),
(6, 2);