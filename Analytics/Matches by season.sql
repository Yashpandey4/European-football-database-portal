
-- Detailed info about matches per season (for a particular country)

SELECT Match.id, 
        Country.name AS country_name, 
        League.name AS league_name, 
        season, 
        stage, 
        date,
        HT.team_long_name AS home_team,
        AT.team_long_name AS away_team,
        CASE WHEN home_team_goal > away_team_goal then home_team
            ELSE away_team
            END AS Winning_team,
        home_team_goal, 
        away_team_goal,                     
FROM Match
JOIN Country on Country.id = Match.country_id
JOIN League on League.id = Match.league_id
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id
-- WHERE country_name = 'Spain'
ORDER by date;