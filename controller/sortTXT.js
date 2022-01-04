const fs = require("fs");
const outputToFile = require("./outputToFile");
const quickSort = require("./quickSort");

/**
 * 
 * @param {String} inputFile - path to input file
 * @param {String} outputFile - path to output file
 * @returns {void}
 */

function sortTXT(inputFile, outputFile) {
    try {
        const data = fs.readFileSync(inputFile, "utf8").split("\n");
        outputToFile(quickSort(data), outputFile);
    } catch (error) {
        //throws error if there is error with reading or writing
        throw new Error(error);
    }
}

module.exports = sortTXT;
