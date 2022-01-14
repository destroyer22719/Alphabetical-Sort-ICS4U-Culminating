/*
    Nathan Cai
    Jan 14, 2022
    outputToFile.js
    334915105

    file with sortJSON function to sort values in json files
*/

const fs = require("fs");
const outputToFile = require("./outputToFile");
const quickSort = require("./quickSort");


/**
 * Function to sort the values in a json file
 * 
 * @param {string} inputFile path of input file 
 * @param {string} outputFile path of output file
 */
function sortJSON(inputFile, outputFile) {
    try {
        const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

        if (!Array.isArray(data))
            throw new Error("incompatible data, must be an array");
        outputToFile(quickSort(data), outputFile);
    } catch (error) {
        //throws error if there is error with reading or writing
        throw new Error(error);
    }
}

module.exports = sortJSON;