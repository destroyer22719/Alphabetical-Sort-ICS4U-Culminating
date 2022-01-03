const { expect } = require("@jest/globals");
const quickSort = require("../../controller/quickSort");

test("Sorting letters", () => {
    const unsorted1 = ["j", "a", "f", "h", "i", "c", "b", "e", "d", "g"];
    const unsorted2 = [ "i", "d", "f", "a", "g", "c", "b", "e", "j", "h"];
    const unsorted3 = [ "c", "f", "b", "a", "g", "d", "e", "h", "i", "j"];

    const sorted = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    expect(quickSort(unsorted1)).toEqual(sorted);
    expect(quickSort(unsorted2)).toEqual(sorted);
    expect(quickSort(unsorted3)).toEqual(sorted);

});

test("Sorting words", () => {
    const unsorted1 = ["storage", "vision", "digress", "feather", "earthquake", "retreat", "fox", "bolt", "knot", "public"];
    const sorted1 = ["bolt","digress","earthquake","feather","fox","knot","public","retreat","storage","vision"];

    const unsorted2 = ["jockey", "look", "bundle", "horse", "mold", "feel", "cultural", "activity", "news", "tribute"];
    const sorted2 = ["activity","bundle","cultural","feel","horse","jockey","look","mold","news","tribute"];

    const unsorted3 = ["small", "boom", "chauvinist", "tension", "comedy", "preach", "cup", "issue", "bark", "incident"];
    const sorted3 = ["bark","boom","chauvinist","comedy","cup","incident","issue","preach","small","tension"];

    expect(quickSort(unsorted1)).toEqual(sorted1);
    expect(quickSort(unsorted2)).toEqual(sorted2);
    expect(quickSort(unsorted3)).toEqual(sorted3);
});

test("Error handling", () => {
    const unsorted1 = ["c", "f", "b", "a", "g", "d", "e", "h", "i", [1,2,3]];
    const unsorted2 = ["c", "f", "b", "a", "g", "d", "e", "h", "i", [1,2,3]];
    const unsorted3 = ["c", {myArray: [1,2,3]}, "b", "a", "g", "d", "e", "h", "i", "j"];

    expect(() => quickSort(unsorted1)).toThrow("Invalid data, must be an array of strings and or numbers only");
    expect(() => quickSort(unsorted2)).toThrow("Invalid data, must be an array of strings and or numbers only");
    expect(() => quickSort(unsorted3)).toThrow("Invalid data, must be an array of strings and or numbers only");
});
