"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

    let matches = 0;
    const characterCount = {};
    for(let character of word.toLowerCase()) {
        characterCount[character] = characterCount[character] ? characterCount[character] + 1 : 1;
    }

    for(let character of guess.toLowerCase()) {
        if(characterCount[character]) {
            matches++;
            characterCount[character]--;
        }
    }
    return matches;
}
