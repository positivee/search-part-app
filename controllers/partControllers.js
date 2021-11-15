// Load modules
const partModel = require("../models/partModel");
const multer = require("multer");
const unirest = require("unirest");
const xlsx = require("xlsx");
const axios = require("axios");
const fetchEuroPrice = async () => {
  return axios
    .get("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .then(function (response) {
      // handle success
      // console.log(response.data.rates[0].mid);
      return response.data.rates[0].mid;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./excel");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("Excelfile");

async function search_part_get(request, response) {
  if ((await fetchEuroPrice()) != undefined)
    response.render("index", { euroPrice: await fetchEuroPrice() });
  else response.render("index", { euroPrice: "brak interentu" });
}

// POST
async function search_part_post(request, response) {
  const part_number = request.body.Partnumber;
  const euroPrice = await fetchEuroPrice();

  if ((await fetchEuroPrice()) != undefined) {
    partModel.getPartInformation(part_number, (result) => {
      response.render("index", {
        searchPart: result,
        euroPrice: euroPrice,
      });
    });
  } else
    response.render("index", {
      searchPart: result,
      euroPrice: "brak interentu",
    });
}

async function search_parts_excel(request, response) {
  const euroPrice = await fetchEuroPrice();

  upload(request, response, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Uploaded");
      const partsFromExcel = convertExcelToObject(
        "excel/" + request.file.originalname
      );
      if (euroPrice != undefined) {
        partModel.getPartsInformations(partsFromExcel, (result) => {
          response.render("index", {
            searchPart: result,
            euroPrice: euroPrice,
          });
        });
      } else
        response.render("index", {
          searchPart: result,
          euroPrice: "brak interentu",
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
