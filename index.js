const fs = require('fs');
const wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const requiredLetters = ['e', 's'];
const excludedLetters = ['t', 'o', 'k', 'n', 'h', 'r', 'a', 'c', 'l', 'u'];

const fiveLetterWords = wordArray.filter(word => {
  return word.length === 5 &&
         word[3] === 'e' &&
        //  word[2] === 's' &&
        //  word[3] === 't' &&
        //  word[5] === 'r' &&
        //  word[4] === 'e' &&
         word[0] !== 'e' &&
         word[1] !== 's' &&
         word[2] !== 's' &&
         word[4] !== 's' &&
        //  word[2] !== 'n' &&
        //  word[1] !== 'o' &&
        //  word[4] !== 'f' &&
        //  word[5] !== 'o' &&
        //  word[6] !== 'r' &&
         requiredLetters.every(letter => word.includes(letter)) &&
         !excludedLetters.some(letter => word.includes(letter));
});

console.log(fiveLetterWords);
console.log(`Total words: ${fiveLetterWords.length}`);
