-- Number of players born in the same year, which are born after 1990

SELECT 
COUNT(p.player_name) AS number_of_players, 
strftime('%Y',p.birthday) AS "year_born"
FROM Player AS p
INNER JOIN Player_Attributes AS pa 
ON p.player_api_id = pa.player_api_id
GROUP BY year_born
HAVING year_born > '1990';