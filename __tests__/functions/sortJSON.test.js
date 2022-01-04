const {
    expect,
    describe,
    test,
    beforeAll,
    afterAll,
} = require("@jest/globals");
const path = require("path");
const fs = require("fs");
const sortJSON = require("../../controller/sortJSON");

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
    //removes every file in the output directory after finishing
    fs.readdirSync(outputDir).forEach((file) =>
        fs.unlinkSync(path.join(outputDir, file))
    );
});

describe("To test the sortJSON function", () => {
    test("testing one line", () => {
        sortJSON(
            path.join(inputDir, "input1.json"),
            path.join(outputDir, "output1.json")
        );
        expect(fs.existsSync(path.join(outputDir, "output1.json"))).toBe(true);
        expect(
            JSON.parse(
                fs.readFileSync(path.join(inputDir, "input1.json"), "utf8")
            )
        ).toEqual(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output1.json"), "utf8")
            )
        );
    });

    test("testing two lines", () => {
        sortJSON(
            path.join(inputDir, "input2a.json"),
            path.join(outputDir, "output2a.json")
        );
        expect(fs.existsSync(path.join(outputDir, "output2a.json"))).toBe(true);
        expect(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output2a.json"), "utf8")
            )
        ).toEqual(
            JSON.parse(
                fs.readFileSync(path.join(inputDir, "input2a.json"), "utf8")
            )
        );

        sortJSON(
            path.join(inputDir, "input2b.json"),
            path.join(outputDir, "output2b.json")
        );
        expect(fs.existsSync(path.join(outputDir, "output2b.json"))).toBe(true);
        expect(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output2b.json"), "utf8")
            )
        ).toEqual(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output2a.json"), "utf8")
            )
        );
    });

    test("testing more than 2 lines of letters", () => {
        sortJSON(
            path.join(inputDir, "input3a.json"),
            path.join(outputDir, "output3a.json")
        );
        expect(fs.existsSync(path.join(outputDir, "output3a.json"))).toBe(true);
        expect(
            JSON.parse(
                fs.readFileSync(path.join(outputDir, "output3a.json")),
                "utf8"
            )
        ).toEqual(["d", "e", "h", "l", "l", "l", "o", "o", "r", "w"]);

        sortJSON(
            path.join(inputDir, "input3b.json"),
            path.join(outputDir, "output3b.json")
        );
        expect(fs.existsSync(path.join(outputDir, "output3b.json"))).toBe(true);
        expect(
            JSON.parse(fs.readFileSync(path.join(outputDir, "output3b.json"), "utf8"))
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
