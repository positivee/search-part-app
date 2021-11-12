// Load modules
const partModel = require("../models/partModel");
const multer = require("multer");
const unirest = require("unirest");
const xlsx = require("xlsx");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./excel");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

let upload = multer({ storage: storage }).single("Excelfile");

function search_part_get(request, response) {
  unirest
    .get("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .end(function (result) {
      let euroPrice = "brak internetu";
      if (result.body != undefined) euroPrice = result.body.rates[0].mid;

      response.render("index", { euroPrice: euroPrice });
    });
}

// POST
function search_part_post(request, response) {
  const part_number = request.body.Partnumber;

  unirest
    .get("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .end(function (result) {
      let euroPrice = "brak internetu";
      if (result.body != undefined) euroPrice = result.body.rates[0].mid;
      partModel.getPartInformation(part_number, (result) => {
        response.render("index", { searchPart: result, euroPrice: euroPrice });
      });
    });
}

function search_parts_excel(request, response) {
  upload(request, response, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Uploaded");
      const partsFromExcel = convertExcelToObject(
        "excel/" + request.file.originalname
      );
      unirest
        .get("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
        .end(function (result) {
          let euroPrice = "brak internetu";
          if (result.body != undefined) euroPrice = result.body.rates[0].mid;

          partModel.getPartsInformations(partsFromExcel, (result) => {
            response.render("index", {
              searchPart: result,
              euroPrice: euroPrice,
            });
          });
        });
    }
  });
}

//converting specifict 2 columns from excel and converting to object
function convertExcelToObject(filePath) {
  let wb = xlsx.readFile(filePath);
  let sheetName = wb.SheetNames[0];
  let sheetValue = wb.Sheets[sheetName];
  let partsFromExcel = [];
  for (let R = 6; R <= 60; ++R) {
    if (getCellData(4, R, sheetValue) != undefined)
      partsFromExcel.push({
        partNumber: getCellData(4, R, sheetValue),
        partsCount: getCellData(3, R, sheetValue),
      });
  }

  return partsFromExcel;
}
function getCellData(cValue, rValue, sheetValue) {
  let cell_address = { c: cValue, r: rValue };
  let data = xlsx.utils.encode_cell(cell_address);
  let desired_value = sheetValue[data] ? sheetValue[data].v : undefined;
  return desired_value;
}

// Export controllers
module.exports = {
  search_part_post,
  search_part_get,
  search_parts_excel,
};
