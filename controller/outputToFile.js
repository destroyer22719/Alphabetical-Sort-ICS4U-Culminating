const fs = require("fs");
const path = require("path");

//writes to output file
function outputToFile(outputData, outputFile) {
    const outputFileExt = path.extname(outputFile);

    switch (outputFileExt) {
        case ".txt":
            fs.writeFileSync(outputFile, outputData.join("\n"), "utf8");
            break;
        case ".json":
            fs.writeFileSync(outputFile, JSON.stringify(outputData), "utf8");
            break;
        default:
            throw new Error(
                "unsupported file type must be of type txt or json"
            );
    }
}

module.exports = outputToFile;
