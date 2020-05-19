USE my_database;
select USER_ID , count(*)
from POST WHERE date (POST.CREATED_AT) = '2020-03-01'
group by USER_ID;