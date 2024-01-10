let songList = [];

fetch('song.json')
    .then(response => response.json())
    .then(data => {
        songList = data.songs;
        resetAll();
    })
    .catch(error => console.error('Error loading song list:', error));


const higherToLower = {
    'A':'a',
    'B':'b',
    'C':'c',
    'D':'d',
    'E':'e',
    'F':'f',
    'G':'g',
    'H':'h',
    'I':'i',
    'J':'j',
    'K':'k',
    'L':'l',
    'M':'m',
    'N':'n',
    'O':'o',
    'P':'p',
    'Q':'q',
    'R':'r',
    'S':'s',
    'T':'t',
    'U':'u',
    'V':'v',
    'W':'w',
    'X':'x',
    'Y':'y',
    'Z':'z'
};

const letters = {
    ' ': 486 * 3,
    '!': 23,
    '#': 1,
    '&': 2,
    "'": 15,
    '(': 27,
    ')': 27,
    '*': 3,
    '+': 3,
    ',': 7,
    '-': 30,
    '.': 35,
    '/': 4,
    '0': 9,
    '1': 7,
    '2': 3,
    '3': 2,
    '4': 2,
    '6': 1,
    '7': 2,
    '9': 5,
    ':': 3,
    ';': 1,
    '<': 1,
    '?': 1,
    '[': 3,
    ']': 3,
    '_': 2,
    'a': 536,
    'b': 89,
    'c': 213,
    'd': 194,
    'e': 649,
    'f': 97,
    'g': 129,
    'h': 171,
    'i': 444,
    'j': 10,
    'k': 78,
    'l': 324,
    'm': 188,
    'n': 351,
    'o': 410,
    'p': 111,
    'q': 10,
    'r': 459,
    's': 349,
    't': 378,
    'u': 175,
    'v': 86,
    'w': 65,
    'x': 40,
    'y': 112,
    'z': 24,
    '|': 3,
    '~': 6,
    'Ä': 2,
    'à': 1,
    'ä': 1,
    'é': 1,
    'ö': 2,
    '÷': 1,
    'ú': 1,
    'ū': 1,
    'Δ': 1,
    'Π': 1,
    'Σ': 2,
    'έ': 1,
    'α': 1,
    'β': 1,
    'γ': 1,
    'δ': 2,
    'ε': 1,
    'ι': 1,
    'κ': 1,
    'μ': 1,
    'ν': 1,
    'ο': 2,
    'ρ': 1,
    'σ': 1,
    'ω': 1,
    'ό': 1,
    'ώ': 1,
    'Я': 1,
    '†': 3,
    '↑': 1,
    '↓': 1,
    '√': 1,
    '♪': 1,
    '：': 1
};


function resetLetters() {
    const charDict = {};
    let sortedCharDict = {};

    songList.forEach(song => {
        for (let char of song) {
            if (!(char in charDict)) {
                charDict[char] = 1;
            } else {
                charDict[char] += 1;
            }
        }
    });

    Object.keys(charDict).sort().forEach(key => {
        sortedCharDict[key] = charDict[key];
    });

    for (let key in sortedCharDict) {
        if (key in higherToLower) {
            let lowerKey = higherToLower[key];
            if (lowerKey in sortedCharDict) {
                sortedCharDict[lowerKey] += sortedCharDict[key];
            }
        }
    }

    for (let key in higherToLower) {
        if (key in sortedCharDict) {
            delete sortedCharDict[key];
        }
    }

    //debuge
    console.log(sortedCharDict);
}

function resetLengthDifficulty() {
    const lengths = {};
    let sortedLengths = {};

    songList.forEach(song => {
        let songLength = song.split(' ').map(word => word.length);
        let lengthKey = JSON.stringify(songLength);

        if (lengths[lengthKey]) {
            lengths[lengthKey]++;
        } else {
            lengths[lengthKey] = 1;
        }
    });

    Object.keys(lengths).sort().forEach(length => {
        sortedLengths[length] = roundDecimal(lengths[length] / songList.length * 1000, 4);
    });


    //debug
    console.log(sortedLengths);
}

function resetSongDifficulty() {
    let songDifficulty = [];

    songList.forEach(song => {
        let difficulty = 0;
        let words = song.split(' ');
        words.forEach(word => {
            for (let letter of word) {
                difficulty += letter in higherToLower ? letters[higherToLower[letter]] : letters[letter];
            }
        });
        difficulty = Math.floor(difficulty / 10);
        difficulty = 475 - difficulty;
        difficulty = 500 - difficulty;
        if (difficulty <= 10) difficulty = 10;

        songDifficulty.push(difficulty);
    });

    console.log(songDifficulty);
}

function resetAll() {
    resetLetters();
    resetLengthDifficulty();
    resetSongDifficulty();
}

function roundDecimal(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}
