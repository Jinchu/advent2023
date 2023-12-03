const fs = require('fs');

// Total number of cubes red, green, blue
const LIMITS = [12, 13, 14];
const COLOURS = ["red", "green", "blue"]

function getInputArry() {
    // Read the file and split it into lines
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\n');
}

function parseLine(inputLine) {
    let gameId = inputLine.split(":")[0]
    let gameRecord = inputLine.split(":")[1].split(";")
    let validGame = true

    gameRecord.forEach(draw => {
        current_cubes = draw.split(",")
        for (let i = 0; i < COLOURS.length; i++) {
            draw.split(",").forEach(current_cubes => {
                if (current_cubes.includes(COLOURS[i])) {
                    // console.log(COLOURS[i] + ":   " + current_cubes);
                    let color_number_str = current_cubes.trim().split(' ')[0]
                    let color_number = parseInt(color_number_str, 10)
                    // console.log(parseInt(color_number, 10))

                    if (color_number > LIMITS[i]) {
                        validGame = false
                    }
                }
            });
        }
    });

    if (validGame) {
        let gameNumber = gameId.split(" ")[1]
        return parseInt(gameNumber, 10)
    }
    else {
        return 0
    }

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
