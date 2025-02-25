const fs = require('fs');

function readCsvFromFile(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf8');
        return csvData;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
    }
}

function fromCsvToJson(csvData){
    // name,surname,yob,gender
    // lorenzo,puppo,1995,m
    // hugo,martinez,1994,m
    // sara,de prà,1989,f
    const arrayOfStringRows = splitCsvInRows(csvData);
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
    const keys = getKeysFromFirstLine(arrayOfSplittedRows);
    console.log(keys);
    // ["name","surname","yob","gender"]
    const values = getValue(arrayOfSplittedRows);
    console.log(values);
    // [
    // ["lorenzo","puppo",1995,"m"]
    // ["hugo","martinez",1994,"m"]
    // ["sara","de prà",1989,"f"]
    // ]
    const ObjectFromEntries = createObjectOfEntries(keys, values);
    console.log(ObjectFromEntries);
    const json = convertObjectToJson(ObjectFromEntries);
    return json;
}

function convertObjectToJson(object) {
    return JSON.stringify(object);
}

function createObjectOfEntries(keys, values) {
    const arrayOfEntries = [];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];

        const entry = createEntry(keys, element);
        arrayOfEntries.push(entry);
    }
    return arrayOfEntries;
}

function createEntry(keys, valueArray) {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = valueArray[i];
        obj[key] = value;
    }
    return obj;
}

function getKeysFromFirstLine(arrayData) {
    const arrayKeys = [...arrayData[0]];
    return arrayKeys;
}

function getValue(arrayData) {
    // si poteva fare anche con .slice
    let arrayOfValues = [];
    for (let i = 1; i < arrayData.length; i++) {
        const array = arrayData[i];
        arrayOfValues.push(array);
        
    }
    return arrayOfValues;
}

function splitCsvInRows(csvData) {
    const arrayDataRows = csvData.split(/\r?\n/);
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
    console.log(json);
}

main();

// (function main() {
// }) ();