// Load modules
const database = require('../database/database');
// const path = require('path');
// const ADODB = require('node-adodb');

// const mdb_path = path.join(__dirname, '../database', 'cennik.mdb');
// const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+mdb_path+';');



//GET PART NUMBER
const getPartInformation = (part_number, callback) => {

 const sql = `SELECT Part_Number, LIST_PRICE FROM Cennik WHERE TRIM(Part_Number)='`+part_number+`'`;

  database.connection.query(sql)
    .then(data => {
      console.log(data);
      callback(data);
    })
    .catch(error => {
      console.error(error);
    });

  // console.log(sql);
  // database.appDatabase.all(sql, [], (error, rows) => {
  //   if (error) {
  //     console.error(error.message);
  //   }
  //   callback(rows);

  // });
};




// Export models
module.exports = {
  getPartInformation
};