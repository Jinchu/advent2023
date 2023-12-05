import * as fs from 'fs';

const COLOURS: string[] = ["red", "green", "blue"]

function getInputArry(): string[] {
    // Read the file and split it into lines
    const data: string = fs.readFileSync('input.txt', 'utf8');
    return data.split('\n');
}

function parseLine(inputLine: string): number {
    let gameId: string = inputLine.split(":")[0]
    let gameRecord: string[] = inputLine.split(":")[1].split(";")
    let power: number = 1;

    // Track highest encountered number of each color
    let highs: number[] = [0, 0, 0]

    console.log("-----")

    gameRecord.forEach(draw => {
        let current_cubes: string[] = draw.split(",")
        for (let i = 0; i < COLOURS.length; i++) {
            draw.split(",").forEach(current_cubes => {
                if (current_cubes.includes(COLOURS[i])) {
                    let color_number_str: string = current_cubes.trim().split(' ')[0]
                    let color_number: number = parseInt(color_number_str, 10)
                    // console.log(COLOURS[i] + ":  " + color_number_str)
                    if (highs[i] < color_number) {
                        highs[i] = color_number
                    }
                }
            });
        }
    });

    power = highs.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
    console.log(highs)

    return power
}

function main(): void {
    let lineValues: number[] = [];
    let inputArray: string[] = getInputArry();

    inputArray.forEach(line => {
        let currentGame: number = 0;
        if (line.length > 0){
            currentGame = parseLine(line)
            lineValues.push(currentGame);
            console.log(currentGame)
        }
        else{
            console.log(line)
        }
    });

    let sum: number = lineValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log('\n--------\nTotal:');
    console.log(sum);
}

main();
