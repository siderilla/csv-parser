const fs = require('fs');

function readCsvFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
    }
}

function fromCsvToJson(csv){
    // name,surname,yob,gender
    // lorenzo,puppo,1995,m
    // hugo,martinez,1994,m
    // sara,de prà,1989,f
    const arrayOfStringRows = splitCsvInRows(csv);
    console.log(arrayOfStringRows);
    // ["name,surname,yob,gender"]
    // ["lorenzo,puppo,1995,m"]
    // ["hugo,martinez,1994,m"]
    // ["sara,de prà,1989,f"]
    const arrayOfSplittedRows = splitRows(arrayOfStringRows);
    console.log(arrayOfSplittedRows);
    // [
    // ["name","surname","yob","gender"]
    // ["lorenzo","puppo",1995,"m"]
    // ["hugo","martinez",1994,"m"]
    // ["sara","de prà",1989,"f"]
    // ]
    // const keys = getKeysFromFirstLine(arrayOfSplittedRows);
    // ["name","surname","yob","gender"]
    // const values = getValue(arrayOfSplittedRows);
    // [
    // ["lorenzo","puppo",1995,"m"]
    // ["hugo","martinez",1994,"m"]
    // ["sara","de prà",1989,"f"]
    // ]
    // const ObjectFromEntries = createObjectOfEntries(keys,values);
    // const json = convertObjectToJson(ObjectFromEntries);
    // return json;
}

function splitCsvInRows(data) {
    const arrayDataRows = data.split(/\r?\n/);
    return arrayDataRows;
}

function splitRows(arrayData){
    let newArray = [];

    for (let i = 0; i < arrayData.length; i++) {
        const stringRow = arrayData[i];

        const arrayStringRow = stringRow.split(',');
        newArray.push(arrayStringRow);
    }

    return newArray;
}

function main() {

    const csvData = readCsvFromFile("./data/test1.csv"); //leggo
    console.log(csvData);

    const json = fromCsvToJson(csvData); //trasformo

    // writeJsonToFile(filePath); //scrivo
}

main();

// (function main() {
// }) ();