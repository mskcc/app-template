const barcodModel = require('../models/BarcodeGenModel')
const axios = require('axios');
const { logger } = require('../helpers/winston');

/**
 * Returns unique barcodes 
 * @returns {Promise<*>}
 */
exports.generateUniqueBarcode = async function (plateType, NumberOfBarcodes) {
  var listOfBarcodes = [];
  var year = new Date().getFullYear().toString().substring(2, 5);
  let counter;
  const result = await barcodModel.findOne({plateType: plateType});
  // no barcodes for plateType yet
  if (result === null) {
    counter = 0;
  } else {
    counter = result.counter;
  }
  let padded = false;
  let prevCountOfTraillingZeros = 0;
  for (let i = 0; i < NumberOfBarcodes; i++) {
    // MSK_DNA_2200001
    newCounter = parseInt(counter) + 1;
    counter = newCounter;
    let countOfTraillingZeros = 5 - String(newCounter).length;
    if (!padded && countOfTraillingZeros != prevCountOfTraillingZeros) {
      year = year.padEnd(String(year).length + countOfTraillingZeros, '0');
      prevCountOfTraillingZeros = countOfTraillingZeros;
      padded = true;
    }
    let uniquePlateBarcode = String(plateType) + "_" + String(year) + newCounter;
    listOfBarcodes.push(uniquePlateBarcode);
    await barcodModel.findOneAndUpdate({plateType: plateType},{$set: { counter: newCounter }}); 
  }
  return listOfBarcodes;
};

exports.getCatFact = async function () {
  return axios
    .get('https://catfact.ninja/fact')
    .then((response) => {
      return { fact: response.data.fact };
    })
    .catch((error) => {
      // console.log(error);
      // return 'Could not retrieve a cat fact';
      throw error;
    })
    .then((response) => {
      return response;
    });
};