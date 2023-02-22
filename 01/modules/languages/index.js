const { french } = require('./french');
const { jpn } = require('./japanese');

// this should be imported as 'const { french, jpn } = require('./english');'
module.exports = {
  french,
  jpn,
};
