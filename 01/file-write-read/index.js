const path = require('path');
const fs = require('fs').promises;

/**
 * Here you may want to write function documentation!!
 */
const readText = async () => {
  // You should wrap all your async code in to try-catch!!
  try {
    // Read File ===========================================
    const pathToFile = path.join('files', 'text.txt'); // create proper path to the file

    const result = await fs.readFile(pathToFile); // read file => Buffer

    const text = result.toString(); // convert Buffer to string

    console.log('|| Text from file =============>>>>>>>>>>>');
    console.log(text);
    console.log('<<<<<<<<<<<=============||');

    // Directories ===========================================
    const dir = 'files';

    const listDirContent = await fs.readdir(dir); // list files names in directory
    const dirStat = await fs.lstat(dir); // returns different statistics of the file

    const isDir = dirStat.isDirectory(); // returns true if file is a directory

    console.log('|| List of files, is directory? =============>>>>>>>>>>>');
    console.log(listDirContent, isDir);
    console.log('<<<<<<<<<<<=============||');

    // Read JSON and write into another JSON =========================
    const pathToJson = path.join('files', 'data.json');

    const data = await fs.readFile(pathToJson); // read json file

    const jsonObj = JSON.parse(data.toString()); // convert Buffer to the string and parse it to the JSON

    console.log('|| JSON object =============>>>>>>>>>>>');
    console.log(jsonObj);
    console.log('<<<<<<<<<<<=============||');

    await fs.writeFile('result.json', JSON.stringify(jsonObj));

    console.log('File successfully created..');
  } catch (err) {
    console.log('Something went wrong..');
    console.log(err.message);
  }
};

readText();
