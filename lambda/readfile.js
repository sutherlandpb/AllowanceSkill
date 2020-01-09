
const request = require('request');
const readline = require('readline');

module.exports.parseFile = function parseFile(url) {
  return new Promise((resolve, reject) => {
    var lineBuffer = '';
 
    const rl = readline.createInterface({
      input: request.get(url).on('error', (err) => reject(err)),
    });
 
    rl
      .on('line', (line) => {        
        lineBuffer = lineBuffer + line + "\n";
      })
      .on('close', () => resolve(lineBuffer));
  });
};