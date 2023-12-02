const fs = require('fs');

// Constants
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const WRITTEN_NUM = ["0", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function getInputStream() {
    // Read the file and split it into lines
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\n');
}

function get_first_digit(inputLine) {
    for (let i = 1; i <= inputLine.length; i++) {
        let currentScope = inputLine.substring(0, i);
        for (let j = 1; j < NUMBERS.length; j++) {
            let number_str = NUMBERS[j]
            let written_number = WRITTEN_NUM[j]
            if (currentScope.includes(number_str)) {
                return NUMBERS[j];
            }
            else if (currentScope.includes(written_number)) {
                return String(j)
            }
        }
    }
}

function get_last_digit(inputLine) {
    for (let i = inputLine.length - 1; i >= 0; i--) {
        let currentScope = inputLine.substring(i, inputLine.length);
        // console.log(currentScope)
        for (let j = 1; j < NUMBERS.length; j++) {
            let number_str = NUMBERS[j]
            let written_number = WRITTEN_NUM[j]
            if (currentScope.includes(number_str)) {
                return NUMBERS[j];
            }
            else if (currentScope.includes(written_number)) {
                return String(j)
            }
        }
    }
}

function parseLine(inputLine) {
    let lineOut = "";
    lineOut += get_first_digit(inputLine);
    lineOut += get_last_digit(inputLine);

    console.log(lineOut)
    return parseInt(lineOut, 10);
}

function main() {
    let lineValues = [];
    let inputStream = getInputStream();

    inputStream.forEach(line => {
        if (line.length > 0){
            lineValues.push(parseLine(line));
        }
        else{
            console.log(line)
        }
    });

    // Sum the line values
    let sum = lineValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log(sum);
}

main();
