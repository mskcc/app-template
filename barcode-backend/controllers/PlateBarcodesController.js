const apiResponse = require('../helpers/apiResponse');
const { authenticateRequest } = require('../middlewares/jwt-cookie');
const { generateUniqueBarcode, getCatFact } = require('../services/services');
// const Cache = require('../helpers/cache');
// const ttl = 60 * 60 * 1; // cache for 1 Hour
// const cache = new Cache(ttl); // Create a new cache service instance
const { logger } = require('../helpers/winston');

/**
 * Returns a unique plate barcode
 *
 * @type {*[]}
 */
exports.generateUniqueBarcode = [
  function (req, res) {
    console.log('info', 'Generating plate barcode');
    let plateType = req.query.plateType;
    let numberOfBarcodes = req.query.numOfBarcodes;
    generateUniqueBarcode(plateType, numberOfBarcodes)
      .then((results) => {
        if (!results) {
          return apiResponse.errorResponse(res, `Could not generate barcodes.`);
        }
        return apiResponse.successResponseWithData(res, 'success', results);
      })
      .catch((err) => {
        return apiResponse.ErrorResponse(res, err.message);
      });
  },
];

exports.getNumOfBarcodes = [
  function (req, res) {
    if(typeof req.body.count === 'undefined'){
        // The parameter is missing, example response...
        res.status(400).json({ error: 'missing parameter count', data: null });
        return;
      }
    return req.body.count;
    // res.status(200).json({ error: null, data: req.body.count});
  },
];

exports.getCatFact = [
  authenticateRequest,
  function (req, res) {
    getCatFact()
      .then((fact) => {
        console.log(fact);
        return apiResponse.successResponseWithData(res, 'success', fact);
      })
      .catch((response) => {
        console.log('error');
        return apiResponse.ErrorResponse(res, 'no cat facts');
      });
  },
];