const {
    expect,
    describe,
    test,
    beforeAll,
    afterAll,
} = require("@jest/globals");
const path = require("path");
const fs = require("fs");
const sortTXT = require("../../controller/sortTXT");

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

    fs.writeFileSync(path.join(inputDir, "input1.txt"), "hello world", "utf8");
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

describe("To test the sortTXT function", () => {
    test("testing one line", () => {
        sortTXT(
            path.join(inputDir, "input1.txt"),
            path.join(outputDir, "output1.txt")
        );
        expect(fs.existsSync(path.join(outputDir, "output1.txt"))).toBe(true);
        expect(fs.readFileSync(path.join(inputDir, "input1.txt"), "utf8")).toBe(
            fs.readFileSync(path.join(outputDir, "output1.txt"), "utf8")
        );
    });

    test("testing two lines", () => {
        sortTXT(
            path.join(inputDir, "input2a.txt"),
            path.join(outputDir, "output2a.txt")
        );
        expect(fs.existsSync(path.join(outputDir, "output2a.txt"))).toBe(true);
        expect(
            fs.readFileSync(path.join(outputDir, "output2a.txt"), "utf8")
        ).toBe(fs.readFileSync(path.join(inputDir, "input2a.txt"), "utf8"));

        sortTXT(
            path.join(inputDir, "input2b.txt"),
            path.join(outputDir, "output2b.txt")
        );
        expect(fs.existsSync(path.join(outputDir, "output2b.txt"))).toBe(true);
        expect(
            fs.readFileSync(path.join(outputDir, "output2b.txt"), "utf8")
        ).toBe(fs.readFileSync(path.join(outputDir, "output2a.txt"), "utf8"));
    });

    test("testing more than 2 lines of letters", () => {
        sortTXT(
            path.join(inputDir, "input3a.txt"),
            path.join(outputDir, "output3a.txt")
        );
        expect(fs.existsSync(path.join(outputDir, "output3a.txt"))).toBe(true);
        expect(
            fs
                .readFileSync(path.join(outputDir, "output3a.txt"), "utf8")
                .split("\n")
        ).toEqual(["d", "e", "h", "l", "l", "l", "o", "o", "r", "w"]);

        sortTXT(
            path.join(inputDir, "input3b.txt"),
            path.join(outputDir, "output3b.txt")
        );
        expect(fs.existsSync(path.join(outputDir, "output3b.txt"))).toBe(true);
        expect(
            fs
                .readFileSync(path.join(outputDir, "output3b.txt"), "utf8")
                .split("\n")
        ).toEqual([
            "a",
            "a",
            "a",
            "a",
            "c",
            "d",
            "e",
            "e",
            "e",
            "e",
            "g",
            "h",
            "h",
            "i",
            "i",
            "i",
            "i",
            "j",
            "k",
            "m",
            "m",
            "n",
            "n",
            "o",
            "o",
            "p",
            "p",
            "r",
            "s",
            "s",
            "t",
            "t",
            "t",
            "u",
            "v",
            "y",
            "y",
        ]);
    });
});
