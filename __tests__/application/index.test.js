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

    // fs.writeFileSync(path.join(inputDir, "input1.txt"), "hello world", "utf8");
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
    fs.writeFileSync(
        path.join(inputDir, "input3a.txt"),
        "h\ne\nl\nl\no\nw\no\nr\nl\nd",
        "utf8"
    );
    fs.writeFileSync(
        path.join(inputDir, "input3b.txt"),
        "i\nh\no\np\ne\nt\nh\ni\ns\nj\na\nc\nk\ns\nu\np\nm\ny\na\nv\ne\nr\na\ng\ne\nt\no\na\nm\ni\nd\nn\ni\nn\ne\nt\ny",
        "utf8"
    );
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(inputDir, "input1.json"),
        JSON.stringify(["hello world"]),
        "utf8"
    );
    fs.writeFileSync(
        path.join(inputDir, "input2a.json"),
        JSON.stringify(["hello", "world"]),
        "utf8"
    );
    fs.writeFileSync(
        path.join(inputDir, "input2b.json"),
        JSON.stringify(["world", "hello"]),
        "utf8"
    );
    fs.writeFileSync(
        path.join(inputDir, "input3a.json"),
        JSON.stringify(["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]),
        "utf8"
    );
    fs.writeFileSync(
        path.join(inputDir, "input3b.json"),
        JSON.stringify([
            "i",
            "h",
            "o",
            "p",
            "e",
            "t",
            "h",
            "i",
            "s",
            "j",
            "a",
            "c",
            "k",
            "s",
            "u",
            "p",
            "m",
            "y",
            "a",
            "v",
            "e",
            "r",
            "a",
            "g",
            "e",
            "t",
            "o",
            "a",
            "m",
            "i",
            "d",
            "n",
            "i",
            "n",
            "e",
            "t",
            "y",
        ]),
        "utf8"
    );
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
            resolve();
        });
    });
};

describe("to test the code as a CLI application as an end user", () => {
    test("error handling", async () => {
        await expect(runProgram()).rejects.toThrow("No input file provided");

        await expect(runProgram("404.txt")).rejects.toThrow(
            "no such file or directory 404.txt"
        );

        fs.writeFileSync(path.join(inputDir, "input1.txt"), "hello world", "utf8");

        await expect(
            runProgram(path.join(inputDir, "input1.txt"), "404.txt")
        ).rejects.toThrow("no such file or directory 404.txt");

        
    });
});
