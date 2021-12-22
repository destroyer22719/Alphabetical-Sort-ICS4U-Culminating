const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];
//throws error when there is no input
if (!inputFile) throw new Error("No input file provided");

const outputFile = process.argv[3] || inputFile;

const inputFileExt = path.extname(inputFile).substring(1);
const outputFileExt = path.extname(outputFile).substring(1);

try {
	switch(inputFileExt) {
		case "txt":
			sortTXT();
			break;
		case "json":
			sortJSON();
			break;
		default:
			throw new Error("incompatible file type must be of type txt or json");
	}	
} catch (error) {
	console.log(error);
}


//function to sort words
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];

    //values that're less than pivot value
    const left = [];
    //values that're equal to or more than the pivot value
    const right = [];

    /*
    If the value of the element is smaller than the pivot (first element of the array) add it to the left side, else add it to the right side.

    Use this process for the individual left side array that're smaller than pivot and the right side array which is greater than or equal to pivot again, rinse and repeat till there is no left and right side array or there's just one value.
  
  */
    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return [...quickSort(left), ...pivot, ...quickSort(right)];
}

//sorts txt files
function sortTXT() {
    try {
        const data = fs.readFileSync(inputFile, "utf8").split("\n");
        outputToFile(quickSort(data));
    } catch (error) {
        //throws error if there is error with reading or writing
        console.log(error);
    }
}

//sorts json file
function sortJSON() {
    try {
        const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

        if (!Array.isArray(data))
            throw new Error("incompatible data, must be an array");
        if (data.every((i) => typeof i !== "string" || typeof i !== "number"))
            throw new Error(
                "incompatible data, must be an array of strings or numbers only"
            );
        outputToFile(quickSort(data));
    } catch (error) {
        //throws error if there is error with reading or writing
        console.log(error);
    }
}

//writes to output file
function outputToFile(output) {
    try {
        switch (outputFileExt) {
            case "txt":
                fs.writeFileSync(outputFile, output.join("\n"), "utf8");
                break;
            case "json":
                fs.writeFileSync(outputFile, JSON.stringify(output), "utf8");
                break;
            default:
                throw new Error(
                    "unsupported file type, must be only txt or json"
                );
        }
    } catch (error) {
        console.log(error);
    }
}
