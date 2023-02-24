/**
 * To run this project first of all change directory to the ./02
 * Run 'npm install' command to install the modules
 * node_modules directory should not be included in the project and will be automatically generated
 *
 * To launch the game enter 'node index.js' or 'node index.js -f <some file name>'
 */

// path to current directory
// console.log(__dirname);

// path to current file
// console.log(__filename);

// array contains path to node execution file, current directory and command line arguments
// console.log(process.argv);

// object contains different environment variables
// console.log(process.env);

// returns current working directory
// console.log(process.cwd());

// stop execution process
// process.exit();

const readline = require('readline');
const fs = require('fs').promises;
const { program } = require('commander');
require('colors');

// setup arguments params like flag, description and defaults
// use this to launch program like 'node index.js -f <name of your file>' or 'node index.js --file <name your file>'
// <type> and second argument is used for showing the hint if you try wrong syntax like 'node index.js -f'
// [type] can be used if argument is optional. You can use any word, not exactly 'type'
// third argument - default file name
// check documentation for this great program on the npm page =^^=
program.option('-f, --file [type]', 'file for saving results', 'game_results.txt');

// use command line arguments
program.parse(process.argv);

// create readline instance and config it to interact with user via command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// just example how to use readline
// rl.on('line', (txt) => {
//   console.log(`You entered this text: ${txt}`);

//   process.exit();
// });

// Counter of users attempts
let counter = 0;

/** Gussed number */
const mind = Math.ceil(Math.random() * 10);

// path to the log file, which we setup in the config (line 25-28)
const logFile = program.opts().file;

/**
 * Simple input data validator.
 * @param {number} val - value to validate
 * @returns {boolean}
 */
const isValid = (val) => {
  if (!isNaN(val) && val > 0 && val <= 10) return true;

  if (isNaN(val)) console.log('Please, enter a number!!'.red);
  if (val < 1 || val > 10) console.log('Number shoud be between 1 and 10'.red);

  return false;
};

/**
 * Log game results in to the text file.
 * @param {string} msg - message to log
 * @returns {Promise<void>} - it means returning promise with no returned data
 */
const logger = async (msg) => {
  try {
    await fs.appendFile(logFile, `${msg}\n`);

    console.log(`Successfully saved game results to the file ${logFile}`.yellow);
  } catch (err) {
    console.log(`Something went wrong.. ${err.message}`);
  }
};

/**
 * Main game process
 */
const game = () => {
  // ask the question
  rl.question('Please, enter any whole number between 1 and 10!\n'.green, (val) => {
    // convert type of the variable "val" from string to number.
    //Same as const number = Number(val);
    const number = +val;

    // if number value is invalid, send message and launch game again
    if (!isValid(number)) return game();

    // counter = counter + 1;
    // counter += 1;
    counter++;

    // if number is not right
    if (number !== mind) {
      console.log('Oh no! Try again!!!'.red);

      return game();
    }

    // number is right
    console.log(`Congratulations!!!!! You guessed the number in ${counter} step(s) =^^=`.magenta);

    // log game results
    logger(
      `${new Date().toLocaleString('uk-UA')}: Congratulations!!!!! You guessed the number in ${counter} step(s) =^^=`
    );

    // close interaction with user
    rl.close();
  });
};

// launch main game cycle
game();
