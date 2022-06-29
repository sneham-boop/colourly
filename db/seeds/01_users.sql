-- Users table seeds here (Example)
INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Roger Pelican', 'rogerpelican@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- INSERT INTO polls (owner_email, admin_link, submit_link, question_text, created_at, end_date, active)
-- VALUES ('victoriablackwell@outlook.com', 'admin link', 'submit link', 'Where should we eat tonight?', current_timestamp, '2022-09-22', TRUE),
-- ('sebastianguerra@ymail.com', 'admin link', 'submit link', 'What movie should we watch this weekend?', current_timestamp, '2022-09-22', TRUE),
-- ('jacksonrose@hotmail.com', 'admin link', 'submit link', 'Which TV show is best?', current_timestamp, '2022-09-22', TRUE),
-- ('rogerpelican@gmail.com', 'admin link', 'submit link', 'Which is the best travel destination?', current_timestamp, '2022-09-22', TRUE);

INSERT INTO polls (owner_email, question_text, created_at, active)
VALUES ('victoriablackwell@outlook.com', 'Where should we eat tonight?', current_timestamp, TRUE),
('sebastianguerra@ymail.com', 'What movie should we watch this weekend?', current_timestamp, TRUE),
('jacksonrose@hotmail.com', 'Which TV show is best?', current_timestamp, TRUE),
('rogerpelican@gmail.com', 'Which is the best travel destination?', current_timestamp, TRUE);


INSERT INTO options (poll_id, option_text)
VALUES (1, 'Sunshine Diner'),
(1, 'Jam Cafe'),
(1, 'Au Comptoir'),
(1, 'Sophies Cosmic Cafe'),
(2, 'Terminator 2'),
(2, 'First Blood'),
(2, 'Tampopo'),
(2, 'Enter The Dragon'),
(3, 'Seinfeld'),
(3, 'Friends'),
(3, 'Arrested Development'),
(3, 'Buffy the Vampire Slayer'),
(4, 'Europe'),
(4, 'Asia'),
(4, 'Africa'),
(4, 'South America');

--poll 1
INSERT INTO votes
(user_email, poll_id, vote_1, vote_2, vote_3, vote_4, voted_at)
VALUES ('sebastianguerra@ymail.com', 1, 1, 2, 3, 4, current_timestamp),

('jacksonrose@hotmail.com', 1, 3, 2, 4, 1, current_timestamp),

('victoriablackwell@outlook.com', 1, 3, 2, 1, 4, current_timestamp),

('rogerpelican@gmail.com', 1, 3, 1, 4, 2, current_timestamp);

 --poll 2
-- INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
-- VALUES (1, 2, 1, 1, current_timestamp),
-- (1, 2, 2, 2, current_timestamp),
-- (1, 2, 4, 3, current_timestamp),
-- (1, 2, 3, 4, current_timestamp),
-- (2, 2, 3, 1, current_timestamp),
-- (2, 2, 1, 2, current_timestamp),
-- (2, 2, 4, 3, current_timestamp),
-- (2, 2, 2, 4, current_timestamp),
-- (3, 2, 2, 2, current_timestamp),
-- (3, 2, 4, 3, current_timestamp),
-- (3, 2, 3, 4, current_timestamp),
-- (3, 2, 1, 2, current_timestamp),
-- (4, 2, 3, 1, current_timestamp),
-- (4, 2, 4, 3, current_timestamp),
-- (4, 2, 1, 2, current_timestamp),
-- (4, 2, 2, 4, current_timestamp);

-- --poll 3
-- INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
-- VALUES (1, 3, 1, 1, current_timestamp),
-- (1, 3, 2, 2, current_timestamp),
-- (1, 3, 4, 3, current_timestamp),
-- (1, 3, 3, 4, current_timestamp),
-- (2, 3, 3, 1, current_timestamp),
-- (2, 3, 1, 2, current_timestamp),
-- (2, 3, 4, 3, current_timestamp),
-- (2, 3, 2, 4, current_timestamp),
-- (3, 3, 2, 2, current_timestamp),
-- (3, 3, 4, 3, current_timestamp),
-- (3, 3, 3, 4, current_timestamp),
-- (3, 3, 1, 2, current_timestamp),
-- (4, 3, 3, 1, current_timestamp),
-- (4, 3, 4, 3, current_timestamp),
-- (4, 3, 1, 2, current_timestamp),
-- (4, 3, 2, 4, current_timestamp);

-- --poll 4
-- INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
-- VALUES (1, 4, 1, 1, current_timestamp),
-- (1, 4, 2, 2, current_timestamp),
-- (1, 4, 4, 3, current_timestamp),
-- (1, 4, 3, 4, current_timestamp),
-- (2, 4, 3, 1, current_timestamp),
-- (2, 4, 1, 2, current_timestamp),
-- (2, 4, 4, 3, current_timestamp),
-- (2, 4, 2, 4, current_timestamp),
-- (3, 4, 2, 2, current_timestamp),
-- (3, 4, 4, 3, current_timestamp),
-- (3, 4, 3, 4, current_timestamp),
-- (3, 4, 1, 2, current_timestamp),
-- (4, 4, 3, 1, current_timestamp),
-- (4, 4, 4, 3, current_timestamp),
-- (4, 4, 1, 2, current_timestamp),
-- (4, 4, 2, 4, current_timestamp);


