# Alphabetical Sort (ICS4U Culminating)
## How to Use

```bash
$ npm start inputFile [outputFile]
```

>**inputFile** - path to the input file, the program will read the file and sort by line

>**outputFile (optional)** - path to output file, where the sorted values will go, if none provided sorted data will go into input file, if file doesn't exist automatically creates one

## Examples
in input.txt
```txt
c
b
a
```

```bash
$ npm start input.txt output.txt
```

now in output.txt
```txt
a
b
c
```

This program also supports sorting json to json, json to txt, and vice versa. BUT it must be an array of strings and or numbers

This is valid
```json
[
    "hello",
    "world",
]
```
This is NOT valid
```json
{
    "values": ["hello", "world"]
}
```

## Setting Up

To run this program you need to make sure your computer can run NodeJS and install the code

First make sure you have NodeJS installed, if not you can install it at https://nodejs.org/en/, installing a modern version is ideal, above version 12.

Then you need to download the code, click on the green code button and click "Download ZIP", once you downloaded it you need to unzip it.

Once you are done you run the following commands

```bash
$ cd /path/to/directory
$ npm start inputfile [outputFile]
```

# Design Documentation

## How and why you decide to break up your code the way you did

I decided to make every function into its own file, and to import them when necessary, by having them in seperate files I can test them individually in the `__tests__/unit` file. The main file, `index.js` handles the command lind logistics of the program and uses whatever function necessary.

the directory `__tests__` contains some automated tests for the code.

`__tests__/unit` has unit tests for each function and `__tests__/integration` has integration tests and will run the program like if it were the end user

## Why you chose certain processes to be recursive

I chose the `quickSort` function to be recursive because that's how it's supposed to be implemented. Quick sort will keep on dividing the values into smaller pieces and sorting them.

## Why you implemented the search and/or sorting methods that you chose

Because quick sort is the best algorithm out of all the available ones when it comes to for large amounts of data.
Bubble sort needs to re-iterate the entire array every time something is out of order which is time consuming.
Insertion sort is okay except for large amount of values it has to always keep on going back to find where is the right index to put the element.
Selection sort is also not as good for large data sets as it has to iterate, and swap through every element. 
quick sort is better because it can break the array into smaller datasets which is ideal for large data sets.

## Why the program reads/writes to a file, and how is this useful to the program

The program reads the file to know what to sort in the first place and outputs to a file for the user the user to see the sorted values.
