// Load modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ADODB = require('node-adodb');

// Connect with SQLite database
const mdb_path = path.join(__dirname, '../database', 'cennik.mdb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+mdb_path+';');
 

// Export database object
 module.exports = {  connection };