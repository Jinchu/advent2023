const fs = require('fs');

// Total number of cubes red, green, blue
const COLOURS = ["red", "green", "blue"]

function getInputArry() {
    // Read the file and split it into lines
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\n');
}

function parseLine(inputLine) {
    let gameId = inputLine.split(":")[0]
    let gameRecord = inputLine.split(":")[1].split(";")
    let power = 1;

    // Track highest encountered number of each color
    let highs = [0, 0, 0]

    console.log("-----")

    gameRecord.forEach(draw => {
        current_cubes = draw.split(",")
        for (let i = 0; i < COLOURS.length; i++) {
            draw.split(",").forEach(current_cubes => {
                if (current_cubes.includes(COLOURS[i])) {
                    let color_number_str = current_cubes.trim().split(' ')[0]
                    let color_number = parseInt(color_number_str, 10)
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

function main() {
    let lineValues = [];
    let inputArray = getInputArry();

    inputArray.forEach(line => {
        let currentGame = 0;
        if (line.length > 0){
            currentGame = parseLine(line)
            lineValues.push(currentGame);
            console.log(currentGame)
        }
        else{
            console.log(line)
        }
    });

    let sum = lineValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log('\n--------\nTotal:');
    console.log(sum);
}

main();
