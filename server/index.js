const express = require('express')
const app = express()
const port = 3000
const host = '127.0.0.1';
const sqlite3 = require('sqlite3').verbose()

const { createServer } = require('node:http');


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})





 

  app.get('/hi', (req, res) => {
    //state = req.query['state'];
    //console.log(state);


    let db = new sqlite3.Database('genesis.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  let sql = `SELECT * FROM Student`;

    db.all(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            //console.log(row.nams);
            //res.write(row.nams row.strength)
        });

        res.json(rows);

    
    });
    


  });

  app.get('/hii', (req, res) => {
    //state = req.query['state'];
    //console.log(state);


    let db = new sqlite3.Database('genesis.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  let sql = `SELECT SchoolName, IncidentID From Incidents`;

    db.all(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            //console.log(row.nams);
            //res.write(row.nams row.strength)
        });

        res.json(rows);

    
    });
    


  });

  