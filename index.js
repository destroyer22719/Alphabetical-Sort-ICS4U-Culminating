const fs = require("fs");

const input = "input.txt";


const data = fs.readFileSync(input, "utf8").split("\n");
const sortedData = quickSort(data);
console.log(sortedData);


//function to sort words
function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[0];
  
  const left = []; 
  const right = [];

  /*
    If the value of the element is smaller than the pivot (first element of the array) add it to the left side, else add it to the right side.

    Use this process for the individual left side array that're smaller than pivot and the right side array which is greater than or equal to pivot again, rinse and repeat till there is no left and right side array or there's just one value.
  
  */
  for (let i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
  }
  
  return [...quickSort(left), ...pivot, ...quickSort(right)];
};
