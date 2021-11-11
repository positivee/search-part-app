// Load modules
const partModel = require("../models/partModel");
let Request = require("request");
const unirest = require("unirest");

function search_part_get(request, response) {
  unirest
    .get("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .end(function (result) {
      let euroPrice = "brak internetu";
      if (result.body != undefined) euroPrice = result.body.rates[0].mid;

      response.render("index", { euroPrice: euroPrice });
      console.log(euroPrice);
    });
}
// Index page controller

// POST
function search_part_post(request, response) {
  const part_number = request.body.Partnumber;
  console.log(request.body.Partnumber);
  unirest
    .get("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .end(function (result) {
      let euroPrice = "brak internetu";
      if (result.body != undefined) euroPrice = result.body.rates[0].mid;
      partModel.getPartInformation(part_number, (result) => {
        console.log(result);
        response.render("index", { searchPart: result, euroPrice: euroPrice });
      });
    });
}

// Export controllers
module.exports = {
  search_part_post,
  search_part_get,
};
