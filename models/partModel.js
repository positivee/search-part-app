// Load modules
const database = require("../database/database");

//GET PART NUMBER
const getPartInformation = (part_number, callback) => {
  const sql =
    `SELECT TRIM(Part_Number) AS partNumber, LIST_PRICE FROM Cennik WHERE TRIM(Part_Number)='` +
    part_number +
    `'`;

  database.connection
    .query(sql)
    .then((data) => {
      callback(data);
    })
    .catch((error) => {});
};
const getPartsInformations = (partsFromExcel, callback) => {
  partsToSql = "";
  for (let i = 0; i < partsFromExcel.length - 1; i++) {
    partsToSql += `'` + partsFromExcel[i].partNumber + `',`;
  }
  partsToSql +=
    `'` + partsFromExcel[partsFromExcel.length - 1].partNumber + `'`;

  const sql =
    `SELECT TRIM(Part_Number) AS partNumber, LIST_PRICE FROM Cennik WHERE TRIM(Part_Number) IN (` +
    partsToSql +
    `) ORDER BY 1`;

  database.connection
    .query(sql)
    .then((data) => {
      //MERGIN TWO OBJECTS FROM EXCEL AND FROM ACCESS
      const result = partsFromExcel.map((v) => ({
        ...v,
        ...data.find((sp) => sp.partNumber === v.partNumber),
      }));

      callback(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Export models
module.exports = {
  getPartInformation,
  getPartsInformations,
};
