const fs = require("fs");
const outputToFile = require("./outputToFile");
const quickSort = require("./quickSort");

//sorts json file
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