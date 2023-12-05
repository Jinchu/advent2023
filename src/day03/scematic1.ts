import * as fs from 'fs';


class NumberPosition {
    private headCoordinates: [number, number];
    private tailCoordinates: [number, number];
    private debug: boolean;

    constructor(debug: boolean = false) {
        this.headCoordinates = [0, 0];
        this.tailCoordinates = [0, 0];
        this.debug = debug;
    }

    /**
     * Parses the whole number on this line. Returns the x coordinate of the last digit.
     * @method parseNumber
     * @param {String} inputLine
     * @param {number} xCoordinate
     * @param {number} yCoordinate
     */
    public parseNumber(inputLine: string, xCoordinate: number, yCoordinate: number): number {
        this.headCoordinates[1] = yCoordinate;
        this.tailCoordinates[1] = yCoordinate;
        this.headCoordinates[0] = xCoordinate;

        for (let i: number = xCoordinate + 1; i < inputLine.length; i++) {
            if (isNaN(Number(inputLine[i]))) {
                // Not a number
                break;
            }
            else {
                // is a number
                this.tailCoordinates[0] = i;
            }
        }

        return this.tailCoordinates[0];
    }

    public returnHead(): [number, number] {
        return this.headCoordinates;
    }
    public returnTail(): [number, number] {
        return this.tailCoordinates;
    }
}


function getInputArry(): string[] {
    // Read the file and split it into lines
    const data: string = fs.readFileSync('input.txt', 'utf8');
    return data.split('\n');
}


function isNumber(letter: string): boolean {
    if (isNaN(Number(letter))) {
        // not a number
        return false;
    }
    else {
        // is number
        return true;
    }
}


function parseLine(inputLine: string, yCoordinate: number) {
    console.log(inputLine)

    let foundNumbers: NumberPosition[] = [];

    let parsed_number: string = "";
    for (let i: number = 0; i < inputLine.length; i++) {
        if (isNaN(Number(inputLine[i]))) {
            // not a number
        }
        else {
            // is number
            let currentPosition: NumberPosition = new NumberPosition();
            i = currentPosition.parseNumber(inputLine, i, yCoordinate);
            foundNumbers.push(currentPosition)
        }
    }

    return foundNumbers;
}

function main(): void {
    let lineValues: number[] = [];
    let inputArray: string[] = getInputArry();

    let foundNumbers: Array<NumberPosition> = [];

    for (let yCoordinate: number = 0; yCoordinate < inputArray.length; yCoordinate++) {
        let current_line: string = inputArray[yCoordinate]
        if (current_line.length > 0){
            foundNumbers = foundNumbers.concat(parseLine(current_line, yCoordinate));
            // console.log(currentGame)
        }
        else{
            console.log(current_line)
        }
    };

    for (let i: number = 0; i < foundNumbers.length; i++) {
        let current_num: NumberPosition = foundNumbers[i];
        console.log("Number on line " + current_num.returnHead()[1] + " from " + current_num.returnHead()[0] + " to " +  current_num.returnTail()[0]);
    }

    let sum: number = lineValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log('\n--------\nTotal:');
    console.log(sum);
}

main();
