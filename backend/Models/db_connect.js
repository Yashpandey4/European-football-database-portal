const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
<<<<<<< HEAD
  database: 'fifa',
  password: '1234',
=======
  database: 'postgres',
  password: process.env.Password,
>>>>>>> fa85da9bc1aea098e9c38d88bca49c7bfc805ee9
  port: 5432,
})
client.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log(err);
        console.log("Error while connecting with database");
 		// console.log(err);
    }
});

// client.query('select * from country;', (err, res) => {
//   console.log(res.rows)
//   client.end()
// })

module.exports = client;