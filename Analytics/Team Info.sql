-- Teams Information

SELECT * FROM Teams, Team_Attributes
WHERE Teams.team_api_id = Team_Attributes.team_api_id
ORDER BY Teams.team_long_name;