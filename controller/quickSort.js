/**
 * function to sort arrays using the quick sort algorithm
 * 
 * @param {String[]|Number[]} array an array to sort 
 * @returns {String[]|Number[]} sorted array
 */

function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    //error handling for incorrect data type
    if (typeof pivot !== "string" || typeof pivot !== "number") throw new Error("Invalid data, must be an array of strings and or numbers only");

    //values that're less than pivot value
    const left = [];
    //values that're equal to or more than the pivot value
    const right = [];

    /*
    If the value of the element is smaller than the pivot (first element of the array) add it to the left side, else add it to the right side.

    Use this process for the individual left side array that're smaller than pivot and the right side array which is greater than or equal to pivot again, rinse and repeat till there is no left and right side array or there's just one value.
  	*/


    for (let i = 1; i < array.length; i++) {
        //checks if data type is valid
        if (typeof array[i] !== "string" || typeof array[i] !== "number") throw new Error("Invalid data, must be an array of strings and or numbers only");
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return [...quickSort(left), ...pivot, ...quickSort(right)];
}

module.exports = quickSort;