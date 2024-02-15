const temp_script = require('./script.js');
const fs = require('fs');

try {
    const args = process.argv.slice(2);
    let outputFileName = args[0];
    if(!outputFileName.includes(".pdf")){
        throw `The provides output file name doesnt have .pdf at the end please make sure it is in correct order`;
        return;
    }
    let jsonFile = args[1];
    if (!fs.existsSync(jsonFile)) {
        throw `The JSON file named as ${jsonFile} is invalid please provide the valid file`;
        return;
    } else {

        temp_script.resume(outputFileName, jsonFile);
    }

} catch (error) {
    console.log(error);
}

