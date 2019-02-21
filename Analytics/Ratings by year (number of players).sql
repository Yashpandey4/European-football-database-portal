-- Number of players born in the same year, which have overall_rating greater than 80

SELECT 
COUNT(p.player_name) AS number_of_players, 
strftime('%Y',p.birthday) AS "year_born"
FROM Player AS p
INNER JOIN Player_Attributes AS pa 
ON p.player_api_id = pa.player_api_id
WHERE pa.overall_rating > 90
GROUP BY year_born;