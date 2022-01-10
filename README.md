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
## Setting Up

To run this program you need to install the code and the dependencies

First make sure you have NodeJS installed, if not you can install it at https://nodejs.org/en/, installing a modern version is ideal, above version 12.

Then you need to download the code, click on the green code button and click "Download ZIP", once you downloaded it you need to unzip it.

Once you are done you run the following commands

```bash
$ cd /path/to/directory
$ npm start inputfile [outputFile]
```

# Design Documentation

## How and why you decide to break up your code the way you did

I decided to make every function into its own file, and to import them when necessary, by having them in seperate files I can test them individually in the `__tests/unit` file. The main file, `index.js` handles the command lind logistics of the program and uses whatever function necessary.

## Why you chose certain processes to be recursive

I chose the `quickSort` function to be recursive because that's how it's supposed to be implemented