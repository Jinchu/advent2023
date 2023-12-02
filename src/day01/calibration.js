const fs = require('fs');

function read_input_file() {
    // Read the content of the file
    var r_data;
    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        r_data = data
        return r_data;
    });
}

function main() {
    var input_str;

    input_str = read_input_file();
    console.log(input_str)
}

main();
