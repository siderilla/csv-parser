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
    const obj = {}; // creo l'oggetto
    for (let i = 0; i < keys.length; i++) { // itero dentro l'array delle chiavi
        const key = keys[i];
        const value = valueArray[i];
        obj[key] = value; // l'indice della chiave corrente viene assegnato all'indice del valore corrente e salvo in obj
    }
    return obj;
}

function getKeysFromFirstLine(arrayData) {
    const arrayKeys = [...arrayData[0]]; // entro dentro array con TUTTI i dati e assegno solo i valori a indice zero (che sono le chiavi)
    return arrayKeys;
}

function getValue(arrayData) {
    // si poteva fare anche con .slice
    let arrayOfValues = []; // array vuoto
    for (let i = 1; i < arrayData.length; i++) { // itero dentro l'array con tutti i dati, ma partendo da indice 1 (salto dunque le key)
        const array = arrayData[i]; // assegno
        arrayOfValues.push(array); // pusho le value in un nuovo array
        
    }
    return arrayOfValues;
}

function splitCsvInRows(csvData) {
    const arrayDataRows = csvData.split(/\r?\n/); // dentro il file cerco la newline e la \r, splitto e assegno a nuovo array
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

function writeJsonToFile(filePath, fileJson) {
    fs.writeFile(filePath, fileJson, err => {
        if (err) {
            console.error("Error");
        } else {
        console.log("Json created!");
        }
    })
}

function main() {

    const csvData = readCsvFromFile("./data/test1.csv"); //leggo
    console.log(csvData);

    const json = fromCsvToJson(csvData); //trasformo

    writeJsonToFile("./output/students.json", json); //scrivo
    console.log(json);
}

main();

// (function main() {
// }) ();