const fs = require("fs");
const path = require("path");
const outputToFile = require("../../controller/outputToFile");
const {
    expect,
    describe,
    test,
    beforeAll,
    afterAll,
} = require("@jest/globals");

const outputDir = path.join(path.resolve("./"), "__tests__", "output");

beforeAll(() => {
    //creates the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
});

afterAll(() => {
    //removes every file in the output directory after finishing
    fs.readdirSync(outputDir).forEach((file) =>
        fs.unlinkSync(path.join(outputDir, file))
    );
});

describe("To test the outputToFile function", () => {
    test("output to txt", () => {
        const output1 = ["hello world"];
        const output2 = ["hello", "world"];
        const output3 = ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"];

        outputToFile(output1, path.join(outputDir, "output1.txt"));
        expect(
            fs
                .readFileSync(path.join(outputDir, "output1.txt"), "utf8")
                .split("\n")
        ).toEqual(output1);

        outputToFile(output2, path.join(outputDir, "output2.txt"));
        expect(
            fs
                .readFileSync(path.join(outputDir, "output2.txt"), "utf8")
                .split("\n")
        ).toEqual(output2);

        outputToFile(output3, path.join(outputDir, "output3.txt"));
        expect(
            fs
                .readFileSync(path.join(outputDir, "output3.txt"), "utf8")
                .split("\n")
        ).toEqual(output3);
    });

    test("output to JSON", () => {
        const output1 = ["hello world"];
        const output2 = ["hello", "world"];
        const output3 = ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"];

        outputToFile(output1, path.join(outputDir, "output1.json"));
        expect(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output1.json"), "utf8")
            )
        ).toEqual(output1);

        outputToFile(output2, path.join(outputDir, "output2.json"));
        expect(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output2.json"), "utf8")
            )
        ).toEqual(output2);

        outputToFile(output3, path.join(outputDir, "output3.json"));
        expect(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output3.json"), "utf8")
            )
        ).toEqual(output3);
    });
});
