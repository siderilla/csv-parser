const array = convertJsonToJs();
const keys = getKeysFromFirstObject(array);
const values = getValuesFromFirstObject(array);
const csv = createCsv(keys, values);