-- Show all colour combinations
SELECT * 
FROM combinations;

-- Show only a users colour combinations
SELECT * FROM combinations
JOIN users ON users.id = combinations.user_id
WHERE users.id = 1;

-- Show all existing colours
SELECT * FROM 