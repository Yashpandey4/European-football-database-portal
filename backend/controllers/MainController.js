/**
 * Created by Sunil
 */
var connection = require('../Models/db_connect');
// var connection = require('../../config');
// var nodemailer = require('nodemailer');


module.exports = {
    home:home,
    search:search,
    update:update,
    insert:insert,
    database:database,
    report:report,
    login:login,
    signup:signup,
    logout:logout,
    mem:mem,
    loginpost:loginpost,
    team:team,
    sql:sql
}

//==========================================================
//========== get request handling==========================
//==========================================================
function home(req,res){
    res.render('home.ejs', {
        user:req.session.user
    });
}
function search(req,res){
    res.render('search/search.ejs', {
        user:req.session.user
    });
}

function update(req,res){
    res.render('update/update.ejs', {
        user:req.session.user
    });
}
function insert(req,res){
    res.render('insert/insert.ejs', {
        user:req.session.user
    });
}

function database(req,res){
    res.render('database/database.ejs', {
        user:req.session.user
    });
}

function report(req,res){
    res.render('report/report.ejs', {
        user:req.session.user
    });
}

function team(req,res){
    res.render('team/team.ejs', {
        user:req.session.user
    });
}

function sql(req,res){
    var query = 'SELECT * from country;' ;
    connection.query(query,[],(err,result)=>{
    
    res.json(result.rows);        
    })
}

function getAllCounties(req,res){
        var query = 'SELECT * from country;' ;
    connection.query(query,(err,result)=>{
    res.json(result.rows);        
    })
}

function playerByHeight(req,res){
    var query = "SELECT player_name, height,    CASE\
        WHEN height < 170.00 THEN 'Short'\
        WHEN height BETWEEN 170.00 AND 185.00 THEN 'Medium'\
        WHEN height > 185.00 THEN 'Tall'    \
        END AS height_class\
        FROM Player;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    })
}

function leagueByCountry(req,res){
    var query = "SELECT Country.id, League.name AS League_name, Country.name AS Country_name\
    FROM League, Country\
    WHERE Country.id=League.country_id;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

// function leagueBySeason(req,res){
//     var query = "SELECT Country.name AS country_name,League.name AS league_name, season,\
//         count(distinct stage) AS number_of_stages,\
//         count(distinct HT.team_long_name) AS number_of_teams,\
//         avg(home_team_goal) AS avg_home_team_scors, \
//         avg(away_team_goal) AS avg_away_team_goals, \
//         avg(home_team_goal-away_team_goal) AS avg_goal_dif,\ 
//         avg(home_team_goal+away_team_goal) AS avg_goals, \
//         sum(home_team_goal+away_team_goal) AS total_goals \                                      
//         FROM Match\
//         JOIN Country on Country.id = Match.country_id\
//         JOIN League on League.id = Match.league_id\
//         LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
//         LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
//         WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
//         GROUP BY Country.name, League.name, season\
//         HAVING count(distinct stage) > 10\
//         ORDER BY Country.name, League.name, season DESC\
//         ;"
//     connection.query(query,(err,result)=>{
//         res.json(result.rows);        
//     }) 
// }

function listAllTeams(req,res){
    var query = "SELECT * FROM Team ORDER BY team_long_name LIMIT 10;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function matchesBySeason(req,res){
    var query = "SELECT Match.id, \
        Country.name AS country_name, \
        League.name AS league_name, \
        season, \
        stage, \
        date,\
        HT.team_long_name AS home_team,\
        AT.team_long_name AS away_team,\
        CASE WHEN home_team_goal > away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Winning_team,\
        home_team_goal, \
        away_team_goal                     \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
ORDER by date\
LIMIT 10\
;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function matchesInfoCountryWise(req,res){
    var query = "SELECT  Match.id, \
        Country.name AS country_name, \
        League.name AS league_name, \
        season, \
        stage, \
        date,\
        HT.team_long_name AS  home_team,\
        AT.team_long_name AS away_team,\
        home_team_goal, \
        away_team_goal   \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
ORDER by date\
LIMIT 10;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function performanceCountryLeagueSeason(req,res){
    var query = "SELECT Country.name AS country_name, \
        League.name AS league_name, \
        season,\
        count(distinct stage) AS number_of_stages,\
        count(distinct HT.team_long_name) AS number_of_teams,\
        avg(home_team_goal) AS avg_home_team_goals, \
        avg(away_team_goal) AS avg_away_team_goals, \
        avg(home_team_goal-away_team_goal) AS avg_goal_dif, \
        avg(home_team_goal+away_team_goal) AS avg_goals, \
        sum(home_team_goal+away_team_goal) AS total_goals                                       \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY Country.name, League.name, season\
HAVING count(distinct stage) > 10\
ORDER BY Country.name, League.name, season DESC\
;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function playersByBirthYear(req,res){
    var query = "SELECT COUNT(p.player_name) AS number_of_players, \
--strftime('%Y',p.birthday) AS \"year_born\"\
EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss')) AS \"year_born\"\
FROM Player AS p\
INNER JOIN Player_Attributes AS pa \
ON p.player_api_id = pa.player_api_id\
GROUP BY year_born;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function playeysByHeight(req,res){
    var query = "SELECT CASE\
    WHEN ROUND(height)<165 then 165\
    WHEN ROUND(height)>195 then 195\
    ELSE ROUND(height)\
    END AS calc_height, \
    COUNT(height) AS distribution, \
    (avg(PA_Grouped.avg_overall_rating)) AS avg_overall_rating,\
    (avg(PA_Grouped.avg_potential)) AS avg_potential,\
    AVG(weight) AS avg_weight \
FROM PLAYER\
LEFT JOIN (SELECT Player_Attributes.player_api_id, \
    avg(Player_Attributes.overall_rating) AS avg_overall_rating,\
    avg(Player_Attributes.potential) AS avg_potential  \
    FROM Player_Attributes\
    GROUP BY Player_Attributes.player_api_id) \
    AS PA_Grouped ON PLAYER.player_api_id = PA_Grouped.player_api_id\
GROUP BY calc_height\
ORDER BY calc_height\
; "
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function playersByYearNumber(req,res){
    var query = "SELECT \
COUNT(p.player_name) AS number_of_players, \
EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss'))::int AS \"year_born\"\
FROM Player AS p\
INNER JOIN Player_Attributes AS pa \
ON p.player_api_id = pa.player_api_id\
GROUP BY year_born\
HAVING EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss'))::int > '1990';"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function playerInfoByBirthYear(req,res){
    var query = "SELECT \
COUNT(p.player_name) AS number_of_players, \
EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss'))::int AS \"year_born\",\
MIN(pa.overall_rating) AS min_overall_rating,\
MAX(pa.overall_rating) AS max_overall_rating, \
AVG(pa.overall_rating) AS average_overall_rating\
FROM Player AS p\
INNER JOIN Player_Attributes AS pa \
ON p.player_api_id = pa.player_api_id\
GROUP BY year_born;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function RatingsByYearNumber(req,res){
    var query = "SELECT \
COUNT(p.player_name) AS number_of_players, \
EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss'))::int AS \"year_born\",\
MIN(pa.overall_rating) AS min_overall_rating,\
MAX(pa.overall_rating) AS max_overall_rating, \
AVG(pa.overall_rating) AS average_overall_rating\
FROM Player AS p\
INNER JOIN Player_Attributes AS pa \
ON p.player_api_id = pa.player_api_id\
GROUP BY year_born;"
    connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function sortByPlayerInfo(req,res){
    var query = "SELECT \
p.player_name,\
--*,\
EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss'))::int AS \"year_born\",\
-- 2019-(CAST(coalesce(year_born, '0') AS integer)) AS \"player_age\"\
2019::int-(select EXTRACT(YEAR FROM to_timestamp(p.birthday, 'YYYY-MM-DD hh24:mi:ss'))::int) AS age,\
pa.overall_rating,pa.potential,pa.preferred_foot,pa.attacking_work_rate,pa.defensive_work_rate,pa.crossing,pa.finishing,pa.heading_accuracy,pa.short_passing,pa.volleys,pa.dribbling,pa.curve,pa.free_kick_accuracy,pa.long_passing,pa.ball_control,pa.acceleration,pa.sprint_speed,pa.agility,pa.reactions,pa.balance,pa.shot_power,pa.jumping,pa.stamina,pa.strength,pa.long_shots,pa.aggression,pa.interceptions,pa.positioning,pa.vision,pa.penalties,pa.marking,pa.standing_tackle,pa.sliding_tackle,pa.gk_diving,pa.gk_handling,pa.gk_kicking,pa.gk_positioning,pa.gk_reflexes\
FROM Player AS p\
INNER JOIN Player_Attributes AS pa \
ON p.player_api_id = pa.player_api_id\
--WHERE (Insert Sorting Attribute here > Insert threshhold value)\
ORDER BY p.player_name\
LIMIT 10\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function teamInfo(req,res){
    var query = "SELECT * FROM Team, Team_Attributes\
WHERE Team.team_api_id = Team_Attributes.team_api_id\
ORDER BY Team.team_long_name;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function bestTeamsSeasonWise(req,res){
    var query = "SELECT Country.name AS country_name, \
        League.name AS league_name,\
        HT.team_long_name,\
        season,\
        count(distinct stage) AS number_of_stages,\
        -- count(distinct HT.team_long_name) AS number_of_teams,\
        avg(home_team_goal) AS avg_home_team_goals, \
        avg(away_team_goal) AS avg_away_team_goals, \
        avg(home_team_goal-away_team_goal) AS avg_goal_dif, \
        avg(home_team_goal+away_team_goal) AS avg_goals, \
        sum(home_team_goal+away_team_goal) AS total_goals                                       \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
--WHERE league.name in () --best teams in a given league\
--WHERE season in () --best teams in a given season\
GROUP BY HT.team_long_name, Country.name, League.name, season\
--HAVING count(distinct stage) > 10\
ORDER BY total_goals DESC, Country.name, League.name, season DESC\
LIMIT 10\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function bestTeamsOfAllTimes(req,res){
    var query = "SELECT Country.name AS country_name, \
        League.name AS league_name,\
        HT.team_long_name,\
        --season,\
        count(distinct stage) AS number_of_stages,\
        -- count(distinct HT.team_long_name) AS number_of_teams,\
        avg(home_team_goal) AS avg_home_team_goals, \
        avg(away_team_goal) AS avg_away_team_goals, \
        avg(home_team_goal-away_team_goal) AS avg_goal_dif, \
        avg(home_team_goal+away_team_goal) AS avg_goals, \
        sum(home_team_goal+away_team_goal) AS total_goals                                       \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
--WHERE league.name in () --best teams in a given league\
GROUP BY HT.team_long_name, Country.name, League.name\
--HAVING count(distinct stage) > 10\
ORDER BY total_goals DESC, Country.name, League.name\
LIMIT 10\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function matchesPlayedInEachLeagueBySeason(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        season, \
        COUNT(distinct Match.id) AS Matches_Played              \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
--WHERE country.name = 'Spain'\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY Country.name, League.name, season\
ORDER by Country.name, League.name, season\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function teamsOrderedByNumberOfHomeMatchesPlayedBySeason(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        HT.team_long_name AS home_team,\
        season,\
        COUNT(distinct Match.id) AS Matches_Played         \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
--WHERE country.name = 'Spain'\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY HT.team_long_name, Country.name, League.name, season\
ORDER by Matches_Played DESC, Country.name, League.name, season, HT.team_long_name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function teamsOrderedByNumberOfHomeMatchesPlayedOfAllTime(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        HT.team_long_name AS home_team,\
        COUNT(distinct Match.id) AS Matches_Played         \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
--WHERE country.name = 'Spain'\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY HT.team_long_name, Country.name, League.name\
ORDER by Matches_Played DESC, Country.name, League.name, HT.team_long_name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function teamsOrderedByNumberOfAwayMatchesPlayedBySeason(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        AT.team_long_name AS away_team,\
        season,\
        COUNT(distinct Match.id) AS Matches_Played         \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
--WHERE country.name = 'Spain'\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY AT.team_long_name, Country.name, League.name, season\
ORDER by Matches_Played DESC, Country.name, League.name, season, AT.team_long_name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function teamsOrderedByNumberOfAwayMatchesPlayedOfAllTime(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        AT.team_long_name AS away_team,\
        COUNT(distinct Match.id) AS Matches_Played         \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
--WHERE country.name = 'Spain'\
WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY AT.team_long_name, Country.name, League.name\
ORDER by Matches_Played DESC, Country.name, League.name, AT.team_long_name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topTeamsByHomeGoalsSeasonWise(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        season, \
        HT.team_long_name AS home_team,\
        SUM(home_team_goal) AS \"home_goals_total\"                   \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY HT.team_long_name, Country.name, League.name, season\
ORDER BY home_goals_total DESC, Country.name, League.name, season DESC\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topTeamsByHomeGoalsOfAllTimes(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        HT.team_long_name AS home_team,\
        SUM(home_team_goal) AS \"home_goals_total\"                   \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY HT.team_long_name, Country.name, League.name\
ORDER BY home_goals_total DESC, Country.name, League.name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topTeamsByAwayGoalsSeasonWise(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        season, \
        AT.team_long_name AS away_team,\
        SUM(away_team_goal) AS \"away_goals_total\"                   \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY AT.team_long_name, Country.name, League.name, season\
ORDER BY away_goals_total DESC, Country.name, League.name, season DESC\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topTeamsByAwayGoalsOfAllTimes(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name, \
        AT.team_long_name AS away_team,\
        SUM(away_team_goal) AS \"away_goals_total\"                   \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY AT.team_long_name, Country.name, League.name\
ORDER BY away_goals_total DESC, Country.name, League.name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topWinningTeamsPerSeason(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name,\
        season,\
        CASE WHEN home_team_goal > away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Winning_team, \
        COUNT(*) as num_wins            \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY Winning_team, Country.name, League.name, season\
ORDER BY num_wins DESC, Country.name, League.name, season DESC\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topWinningTeamsOfAllTimes(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name,\
        CASE WHEN home_team_goal > away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Winning_team, \
        COUNT(*) as num_wins            \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY Winning_team, Country.name, League.name\
ORDER BY num_wins DESC, Country.name, League.name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topLosingTeamsPerSeason(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name,\
        season,\
        CASE WHEN home_team_goal < away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Losing_team, \
        COUNT(*) as num_loss            \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY Losing_team, Country.name, League.name, season\
ORDER BY num_loss DESC, Country.name, League.name, season DESC\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topLosingTeamsOfAllTimes(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name,\
        CASE WHEN home_team_goal < away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Losing_team, \
        COUNT(*) as num_loss            \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY Losing_team, Country.name, League.name\
ORDER BY num_loss DESC, Country.name, League.name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topDrawTeamsPerSeason(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name,\
        season,\
        CASE WHEN home_team_goal = away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Draw_team, \
        COUNT(*) as num_draw          \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY draw_team, Country.name, League.name, season\
ORDER BY num_draw DESC, Country.name, League.name, season DESC\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}

function topDrawTeamsOfAllTimes(req,res){
    var query = "SELECT  \
        Country.name AS country_name, \
        League.name AS league_name,\
        CASE WHEN home_team_goal = away_team_goal then HT.team_long_name\
            ELSE AT.team_long_name\
            END AS Draw_team, \
        COUNT(*) as num_draw          \
FROM Match\
JOIN Country on Country.id = Match.country_id\
JOIN League on League.id = Match.league_id\
LEFT JOIN Team AS HT on HT.team_api_id = Match.home_team_api_id\
LEFT JOIN Team AS AT on AT.team_api_id = Match.away_team_api_id\
WHERE country.name = 'Spain'\
--WHERE country.name in ('Spain', 'Germany', 'France', 'Italy', 'England')\
GROUP BY draw_team, Country.name, League.name\
ORDER BY num_draw DESC, Country.name, League.name\
LIMIT 20\
;"
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByoverall_rating(req,res){
    var query = " SELECT player_name, AVG(overall_rating) AS overall_rating_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND overall_rating > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBypotential(req,res){
    var query = " SELECT player_name, AVG(potential) AS potential_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND potential > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBycrossing(req,res){
    var query = " SELECT player_name, AVG(crossing) AS crossing_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND crossing > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByfinishing(req,res){
    var query = " SELECT player_name, AVG(finishing) AS finishing_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND finishing > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByheading_accuracy(req,res){
    var query = " SELECT player_name, AVG(heading_accuracy) AS heading_accuracy_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND heading_accuracy > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByshort_passing(req,res){
    var query = " SELECT player_name, AVG(short_passing) AS short_passing_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND short_passing > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByvolleys(req,res){
    var query = " SELECT player_name, AVG(volleys) AS volleys_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND volleys > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBydribbling(req,res){
    var query = " SELECT player_name, AVG(dribbling) AS dribbling_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND dribbling > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBycurve(req,res){
    var query = " SELECT player_name, AVG(curve) AS curve_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND curve > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByfree_kick_accuracy(req,res){
    var query = " SELECT player_name, AVG(free_kick_accuracy) AS free_kick_accuracy_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND free_kick_accuracy > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBylong_passing(req,res){
    var query = " SELECT player_name, AVG(long_passing) AS long_passing_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND long_passing > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByball_control(req,res){
    var query = " SELECT player_name, AVG(ball_control) AS ball_control_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND ball_control > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByacceleration(req,res){
    var query = " SELECT player_name, AVG(acceleration) AS acceleration_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND acceleration > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBysprint_speed(req,res){
    var query = " SELECT player_name, AVG(sprint_speed) AS sprint_speed_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND sprint_speed > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByagility(req,res){
    var query = " SELECT player_name, AVG(agility) AS agility_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND agility > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByreactions(req,res){
    var query = " SELECT player_name, AVG(reactions) AS reactions_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND reactions > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBybalance(req,res){
    var query = " SELECT player_name, AVG(balance) AS balance_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND balance > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByshot_power(req,res){
    var query = " SELECT player_name, AVG(shot_power) AS shot_power_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND shot_power > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByjumping(req,res){
    var query = " SELECT player_name, AVG(jumping) AS jumping_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND jumping > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBystamina(req,res){
    var query = " SELECT player_name, AVG(stamina) AS stamina_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND stamina > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBystrength(req,res){
    var query = " SELECT player_name, AVG(strength) AS strength_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND strength > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBylong_shots(req,res){
    var query = " SELECT player_name, AVG(long_shots) AS long_shots_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND long_shots > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByaggression(req,res){
    var query = " SELECT player_name, AVG(aggression) AS aggression_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND aggression > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByinterceptions(req,res){
    var query = " SELECT player_name, AVG(interceptions) AS interceptions_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND interceptions > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBypositioning(req,res){
    var query = " SELECT player_name, AVG(positioning) AS positioning_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND positioning > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersByvision(req,res){
    var query = " SELECT player_name, AVG(vision) AS vision_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND vision > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBypenalties(req,res){
    var query = " SELECT player_name, AVG(penalties) AS penalties_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND penalties > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBymarking(req,res){
    var query = " SELECT player_name, AVG(marking) AS marking_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND marking > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBystanding_tackle(req,res){
    var query = " SELECT player_name, AVG(standing_tackle) AS standing_tackle_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND standing_tackle > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBysliding_tackle(req,res){
    var query = " SELECT player_name, AVG(sliding_tackle) AS sliding_tackle_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND sliding_tackle > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBygk_diving(req,res){
    var query = " SELECT player_name, AVG(gk_diving) AS gk_diving_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND gk_diving > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBygk_handling(req,res){
    var query = " SELECT player_name, AVG(gk_handling) AS gk_handling_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND gk_handling > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBygk_kicking(req,res){
    var query = " SELECT player_name, AVG(gk_kicking) AS gk_kicking_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND gk_kicking > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBygk_positioning(req,res){
    var query = " SELECT player_name, AVG(gk_positioning) AS gk_positioning_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND gk_positioning > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}


function topPlayersBygk_reflexes(req,res){
    var query = " SELECT player_name, AVG(gk_reflexes) AS gk_reflexes_avg\
FROM Player, Player_Attributes\
WHERE Player.player_api_id = Player_Attributes.player_api_id AND gk_reflexes > 0\
GROUP BY 1\
ORDER BY 2 DESC\
LIMIT 10\
; "
       connection.query(query,(err,result)=>{
        res.json(result.rows);        
    }) 
}



function login(req,res){
    res.render(
        'login/login.ejs',
        {
            user:req.session.user,
            message: req.flash('loginMessage')
        }
    );
}
function signup(req, res) {
res.render(
    'login/login.ejs',
     {message: req.flash('signupMessage')}
     );
// (function(){
//     if(true)
//     return; 
// });;
};

function admin(req,res,next){
    // requireRole(req,res,next,'admin');
    if(sessionChecker(req,res,next,'admin'))
    res.render('other/admin.ejs',{
        user: req.session.user
    });
}
function company(req,res,next){
    // requireRole(req,res,next,'company');
    if(sessionChecker(req,res,next,'company'))
    res.render('company/company.ejs',{
        user:req.session.user
    });
}
function member(req,res,next){
    // requireRole(req,res,next,'member');
    if(sessionChecker(req,res,next,'member'))
    res.render('user/intern_listing.ejs',{
        user:req.session.user
    });
}
function companyinternform(req,res,next){
    // requireRole(req,res,next,'company');
    if(sessionChecker(req,res,next,'company'))
    res.render('company/postIntern.ejs',{
        user:req.session.user
    })
}


//========= Logout ==================================
function logout(req,res){
    req.logout();
    res.redirect('/');
}

//==========================================================
//============ SPECIAL GET REQUEST =========================
//==========================================================
function mail(req,res){
    res.render('other/mail.ejs');
}
function verify(req,res){
    var email = req.query.id.split(",")[0];
    connection.query('UPDATE users SET verify="1" where email = ?',email,function(err,results,fields){
        console.log('hey there');
        console.log('results');
        var result;
        if(err) throw err;
        result = parseIt(results);

        console.log(results);
        return res.redirect('/admin');
    });
}
//===========================================================
//========= checks role of user =============================
//===========================================================
function requireRole(req,res,next,role) {    
    console.log(req.user);
    if(typeof req.user != "undefined")
    { 
        if ( req.user.local.role === role) {
            // do nothing
        } else {
            res.redirect('/'+req.user.local.role);
        }
    }else
    {
        res.redirect('/login');
    }
}

var sessionChecker = (req, res, next,role) => {
    if (req.session.user && req.cookies.user_sid) {
        if(req.session.user.Role === role)
        {
            if(req.session.user.verify=== 0){
                req.session.user = null;
                res.redirect('/login');
                // res.clearCookie('user_sid');
                return false;
            }
            else
            {
                return true;
            }
            
        }
        else
        {
            res.redirect(req.session.user.Role);
            return false;
        }
    } else {
        res.redirect('/login');
        return false;
        // next();
    }    
};


//==========================================================
//================ POST REQUEST ============================
//==========================================================
function companyPost(req,res,next){
    var perk="";
    if(req.body.certificate="on")
    perk += "certificate";
    if(req.body.lor="on")
    perk +=",letter of recommendation";
    if(req.body.flexible="on")
    perk +=',felxible work hours';
    if(req.body.job='on')
    perk +='preplacement offer';
    var today = new Date();
    var form = {
        company: req.session.user.name,
        title: req.body.job_title,
        profile: req.body.profile_primary,
        openings: req.body.open_positions,
        location:req.body.location,
        discription: req.body.description,
        jobType:req.body.type,
        end:req.body.start_date_2,
        start: req.body.start_date_1,
        applyby:req.body.last_date,
        Stipend: req.body.salary,
        perks: perk,
        skills: req.body.skill,
        posted_on:today
    }
    var obj = {
        query:{
            to : 'sunilssaharan@gmail.com',
            subject: 'A form has been posted on EDC',
            text: 'A Form has been posted.Please login and approve it'
        }
    }
    send(obj);
    // console.log(req.session);
   // console.log('INSERT INTO form SET '+ form);
    var query = connection.query('INSERT INTO form SET ?',form,function(err,results,fields){
        if(err){
            // res.json({
            //     status:false,
            //     message:'failed form insertion',
            //     'form': form
            // })
            res.redirect('/company');
        }else{
            // res.json({
            //     status:true,
            //     data:results,
            //     message:'form iserted'
            // })
            res.redirect('/company');
        }
    });
 //   console.log(query.sql);
}

function mem(req,res){
    connection.query('SELECT * FROM form where approved = "1"',function(err,results,fields){
    console.log('hey there');
    console.log('results');
    var result;
    if(err) throw err;
    result = parseIt(results);

    console.log(results);
    return res.json(result);
    });
};

function companyforms(req,res){
    connection.query('SELECT * FROM form where company = ?',req.session.user.name,function(err,results,fields){
    console.log('hey there');
    console.log('results');
    var result;
    if(err) throw err;
    result = parseIt(results);

    console.log(results);
    return res.json(result);
    });
};

function admin1post(req,res){
    console.log(req.body);
    connection.query('UPDATE form SET approved="1" where form_id = ?',req.body.form_id,function(err,results,fields){
        console.log('hey there');
        console.log('results');
        var result;
        if(err) throw err;
        result = parseIt(results);

        console.log(results);
        return res.redirect('/admin');
});
}
function adminpost(req,res){
        connection.query('SELECT * FROM form where approved = "0"',function(err,results,fields){
        console.log('hey there');
        console.log('results');
        var result;
        if(err) throw err;
        result = parseIt(results);

        console.log(results);
        return res.json(result);
});
}
function loginpost(req,res,next){
    console.log(req.body);
    // SELECT * FROM `users` WHERE `email` = 'sunilssaharan@gmail.com' 
    connection.query("SELECT * FROM `users` WHERE `email` = "+'\''+req.body.email+'\''+" AND `password` = "+'\''+req.body.password+'\'',function(err,results,fields){
    console.log('hey there');
    console.log('results');
    var result;
    if(err) throw err;
    result = parseIt(results);
    if(!Object.keys(results).length==0)
    {
        if(!results[0].verified==0)
        {

        }
        else
        {
            var user = results[0];
            console.log(results[0]+'\n\n');
            req.logIn(user,function(err)
            {
                if(err){
                    // return next(err);
                }
                
            });
            res.redirect('/'+results[0].role);
            
        }
    }
    else
    {
        res.redirect('/login');
    }

    });   
}



function ambulancePost(req, res){
    var data = req.body;
    if(data.signal == 0)
    {
    var query = makeQuery(data);
    var out = database.getDataFromTable(
         query,
        function(err,result){
            if(err) throw err;
            result = parseIt(result);
            console.log(result);
           return res.json(result);
        }
    );
    }
    else
    {
        var query = " Select * from ambivan";
        console.log(query);
        var out = database.getDataFromTable(
         query,
        function(err,result){
            if(err) throw err;
            result = parseIt(result);
            console.log(result);
           return res.json(result);
        }
    );
    }
}
function postform(req,res,next){
    console.log(req.body);
    var query = 'Insert INTO `form` (`name` , `email` , `phone` , `message`) VALUES(' +'\''+req.body.name+'\''+','+'\''+req.body.email+'\''+','+'\''+req.body.phone+'\''+','+'\''+req.body.message+'\''+')';
    console.log(query);
    var out = database.getDataFromTable(query,function(err,result){
        if(err) throw err;
        else
        {
            console.log("form submitted");
            res.redirect('/');
        }
    });
}
function makeQuery(data){
    var sw_lat = data.SW.lat;
    var ne_lat = data.NE.lat;
    var sw_lng = data.SW.lng;
    var ne_lng = data.NE.lng;
    console.log(sw_lng+ne_lng);
    var query ;//= "SELECT * FROM ambivan";
    if (sw_lng <= ne_lng)
    {
        // doesn't cross the antimeridian
        query = 'SELECT * FROM places WHERE '+sw_lat+' <= latitude AND latitude <= '+ne_lat+' AND ('+sw_lng+' <= longitude AND longitude <= '+ne_lng+')';
    }
    else
    {
        // crosses the antimeridian
        query = 'SELECT * FROM places WHERE '+sw_lat+' <= latitude AND latitude <= '+ne_lat+' AND ('+sw_lng+' <= longitude OR longitude <= '+ne_lng+')';
    }
    console.log(query);
    return query;
}
function parseIt(rawData){
    rawData = JSON.stringify(rawData);
    rawData = JSON.parse(rawData);
    return rawData;
}