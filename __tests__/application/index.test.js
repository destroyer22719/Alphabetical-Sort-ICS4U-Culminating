const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const {
    expect,
    describe,
    test,
    beforeAll,
    afterAll,
} = require("@jest/globals");

const outputDir = path.join(path.resolve("./"), "__tests__", "output");
const inputDir = path.join(path.resolve("./"), "__tests__", "input");

beforeAll(() => {
    //creates the output and input directory and necessary files if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir, { recursive: true });
    }
});

afterAll(() => {
    //removes every file in the output and input directory after finishing
    fs.readdirSync(outputDir).forEach((file) =>
        fs.unlinkSync(path.join(outputDir, file))
    );

    fs.readdirSync(inputDir).forEach((file) =>
        fs.unlinkSync(path.join(inputDir, file))
    );
});

const runProgram = async (inputFile, outputFile) => {
    return new Promise((resolve, reject) => {
        exec(`npm start ${inputFile || ""} ${outputFile || ""}`, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

describe("to test the code as a CLI application as an end user", () => {
    test("error handling", async () => {
        await expect(runProgram()).rejects.toThrow("No input file provided");

        await expect(runProgram("404.txt")).rejects.toThrow(
            "no such file or directory 404.txt"
        );

        fs.writeFileSync(
            path.join(inputDir, "input1.txt"),
            "hello world",
            "utf8"
        );

        fs.writeFileSync(
            path.join(inputDir, "input1.js"),
            "console.log('hello world')",
            "utf8"
        );

        await expect(
            runProgram(path.join(inputDir, "input1.js"))
        ).rejects.toThrow("unsupported file type must be of type txt or json");

        await expect(
            runProgram(
                path.join(inputDir, "input1.txt"),
                path.join(outputDir, "output.js")
            )
        ).rejects.toThrow("unsupported file type must be of type txt or json");
    });

    test("txt to txt", async () => {
        fs.writeFileSync(
            path.join(inputDir, "input2a.txt"),
            "hello\nworld",
            "utf8"
        );

        fs.writeFileSync(
            path.join(inputDir, "input2b.txt"),
            "world\nhello",
            "utf8"
        );

        await runProgram(
            path.join(inputDir, "input2a.txt"),
            path.join(outputDir, "output2a.txt")
        );

        expect(
            fs.readFileSync(path.join(outputDir, "output2a.txt"), "utf8")
        ).toBe("hello\nworld");

        await runProgram(
            path.join(inputDir, "input2b.txt"),
            path.join(outputDir, "output2b.txt")
        );

        expect(
            fs.readFileSync(path.join(outputDir, "output2b.txt"), "utf8")
        ).toBe("hello\nworld");
    });

    test("txt to json", async () => {
        fs.writeFileSync(
            path.join(inputDir, "input2a.txt"),
            "hello\nworld",
            "utf8"
        );

        fs.writeFileSync(
            path.join(inputDir, "input2b.txt"),
            "world\nhello",
            "utf8"
        );

        await runProgram(
            path.join(inputDir, "input2a.txt"),
            path.join(outputDir, "output2a.json")
        );

        expect(
            JSON.parse(fs.readFileSync(path.join(outputDir, "output2a.json")), "utf8")
        ).toEqual(["hello","world"]);

        await runProgram(
            path.join(inputDir, "input2b.txt"),
            path.join(outputDir, "output2b.json")
        );

        expect(
            JSON.parse(fs.readFileSync(path.join(outputDir, "output2b.json")), "utf8")
        ).toEqual(["hello","world"]);
    });
});
