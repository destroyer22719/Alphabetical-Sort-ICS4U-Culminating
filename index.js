const path = require("path");
const fs = require("fs");
const sortJSON = require("./controller/sortJSON");
const sortTXT = require("./controller/sortTXT");

const inputFile = process.argv[2];
//throws error when there is no input
if (!inputFile) throw new Error("No input file provided");

const outputFile = process.argv[3] || inputFile;

const inputFileExt = path.extname(inputFile);

if (!fs.existsSync(inputFile))
    throw new Error(`no such file or directory ${inputFile}`);

switch (inputFileExt) {
    case ".txt":
        sortTXT(inputFile, outputFile);
        break;
    case ".json":
        sortJSON(inputFile, outputFile);
        break;
    default:
        throw new Error("unsupported file type must be of type txt or json");
}
