const fs = require('fs');

// Constants
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function getInputStream() {
    // Read the file and split it into lines
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\n');
}

function parseLine(inputLine) {
    let lineOut = "";

    // Find the first number in the line
    for (let i = 0; i < inputLine.length; i++) {
        if (NUMBERS.includes(inputLine[i])) {
            lineOut += inputLine[i];
            break;
        }
    }

    // Find the last number in the line
    for (let i = inputLine.length - 1; i >= 0; i--) {
        if (NUMBERS.includes(inputLine[i])) {
            lineOut += inputLine[i];
            break;
        }

    }

    // console.log(lineOut)
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
