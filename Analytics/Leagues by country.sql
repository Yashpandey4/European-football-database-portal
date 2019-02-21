-- Participating League and their Countries

SELECT League.name, Country.name FROM League, Country
WHERE Country.id=League.country_id;

-- SELECT * FROM League
-- JOIN Country ON Country.id = League.country_id;