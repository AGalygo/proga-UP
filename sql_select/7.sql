USE my_database;
SELECT DATEDIFF((SELECT CREATED_AT 
FROM POST 
WHERE POST_ID = 1), CURRENT_DATE());