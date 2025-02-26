// STEP1 - leggere il file
// si usa il modulo fs (che significa file system) alla quale si richiede accesso
// in questo modo il mio programma può accedere al percorso in cui si trova il file da leggere

const fs = require('fs');

// dentro filePath scrivo il percorso del file

const filePath = './data/test1.csv';

// READFILE è una funzione asincrona che legge il file
// in questo modo il programma continua a funzionare mentre il file viene letto

// READFILESYNC è una funzione che legge il file in modo sincrono
//  blocca l'esecuzione del codice fino a quando il file non è stato completamente letto

function readCsvFromFile(filePath) {
	const fileContent = fs.readFileSync(filePath, 'utf8');
	return fileContent;
}
const csvData = readCsvFromFile(filePath);
console.log('contenuto csv:\n', csvData);


// STEP2 - trasformare il file in un array
// posso dividere il file in righe cercando le rispettive newline e \r
// in questo modo ottengo un array per ogni riga, che pusherò dentro un array contenitore

function splitCsvInRows(csvData) {
	const arrayOfStrings = csvData.split(/\r?\n/);
	return arrayOfStrings;
}
const arrayOfSplittedRows = splitCsvInRows(csvData);
console.log(arrayOfSplittedRows);

// STEP3 - convertire ciascuna parola in stringa, 
// splittando le virgole in ogni array
// SPLIT rimuove l'elemento divisore ricercato (in questo caso la virgola)
// e suddivide la stringa in sottostringhe
// SPLIT restituisce SEMPRE un array

function splitCommasToStrings(arrayOfSplittedRows) {
	const stringsNoComma = []
	for (let i = 0; i < arrayOfSplittedRows.length; i++) {
		const stringRow = arrayOfSplittedRows[i];

		const tempSplitted = stringRow.split(',');
		stringsNoComma.push(tempSplitted);
	}
	return stringsNoComma;
}
const arrayOfStrings = splitCommasToStrings(arrayOfSplittedRows);
console.log(arrayOfStrings);

// STEP 4 - conversione in chiave oggetto della prima stringa e 
// dei corrispettivi valori delle rimanenti stringhe in correlazione 
// alla posizione dell'indice nell'array

function arrayToObject(arrayOfStrings) {
	const keys = arrayOfStrings[0];
	const arrayOfObjects = []

	for (let i = 1; i < arrayOfStrings.length; i++) {
		const obj = {};
		for (let j = 0; j < keys.length; j++) {
			obj[keys[j]] = arrayOfStrings[i][j];
		}
		arrayOfObjects.push(obj);
	}
	return arrayOfObjects;
}

const convertToObjects = arrayToObject(arrayOfStrings);
console.log(convertToObjects);

// STEP 5 stringify object

function convertObjectToJson(object) {
	return JSON.stringify(object);
}

const jsonStringified = convertObjectToJson(convertToObjects)
console.log(jsonStringified);

function writeToJson(jsonStringified) {
	fs.writeFile('./output/test1.json', jsonStringified, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('File has been written successfully');
        }
	});
}

writeToJson(jsonStringified);