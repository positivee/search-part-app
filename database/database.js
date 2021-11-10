// Load modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ADODB = require('node-adodb');

// Connect with SQLite database
// const db_path = path.join(__dirname, '../database', 'cennik.sqlite');
// const appDatabase = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Successful connected to the database');
// });

// Connect with SQLite database
const mdb_path = path.join(__dirname, '../database', 'cennik.mdb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+mdb_path+';');
 

// Export database object
 module.exports = {  connection };