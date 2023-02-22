// You can give any name here:
const english = require('./english');

// You can import like this, but may be you want use index.js file pattern
// const { french } = require('./languages/french');
const { french, jpn } = require('./languages');

console.log(english());
console.log(french());
console.log(jpn());
