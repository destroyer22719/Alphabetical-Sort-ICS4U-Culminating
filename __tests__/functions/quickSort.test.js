const { expect } = require("@jest/globals");
const { quickSort } = require("../../index");

test("Sorting numbers", () => {
    const unsorted = [5,1,3,2,4];
    const sorted = [1,2,3,4,5];

    expect(quickSort(unsorted)).toEqual(sorted);
});