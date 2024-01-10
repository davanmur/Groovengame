// main.js
document.addEventListener('DOMContentLoaded', () => {
    let currentSong;
    let lettersOpened = []; // var for current guessed letters
    let songAnswer;

    document.getElementById('guessButton').addEventListener('click', handleGuess);

    // guess on enter pressed
    document.getElementById('word-guess').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('guessButton').click();
        }
    });

    //fetch word list from db
    function initializeGame() {
        fetch('GetTheLetter/song.json')// this path should come from the category-selection page
            .then(response => response.json())
            .then(data => {
                let allSongs = data.songs;
                startGame(allSongs);
            })
            .catch(error => console.error('Error loading song list:', error));
    }

    // actual game-initializing function
    function startGame(allSongs) {
        songAnswer = selectRandomSong(allSongs);
        prepareSongForDisplay();
        updateSong();
    }

    // return random song from list of songs
    function selectRandomSong(allSongs) {
        return allSongs.sort(() => 0.5 - Math.random())[0];
    }

    // replace standard characters with stars, leave non-standard characters visible
    function prepareSongForDisplay() {
        currentSong = songAnswer.replace(/[a-zA-Z0-9]/g, '*');
    }

    // update the displayed song that is being guessed to match internal state
    function updateSong() {
        let currentWordDisplay = document.getElementById('current-word');
        currentWordDisplay.textContent = currentSong;
    }

    // displays the already-guessed letters
    function updateGuessedLettersDisplay(newLetter) {
        let displayElement = document.getElementById('letters-guessed');

        if (displayElement.textContent.length > 17) {
            displayElement.textContent += ', ';
        }
        displayElement.textContent += newLetter;
    }

    // first-level logic for handling the guess
    function handleGuess() {
        let guessInput = document.getElementById('word-guess').value.trim();
        if (guessInput.length === 0) {
            return;
        }

        if (guessInput.length === 1) {
            openLetter(guessInput);
        } else {
            // let parts = guessInput.split(' ');
            // let songNameGuessed = parts.slice(1).join(' ');
            guessSong(guessInput);
        }

        updateSong();

        document.getElementById('word-guess').value = '';
        document.getElementById('word-guess').focus();
    }

    // second-level logic for handling the guess: single-letter guessing
    function openLetter(letterOpened) {
        let pointsEarned = 0;
        let explodedWord = false;

        let messageElement = document.getElementById('guessMessage');
        messageElement.textContent = '';

        if (!lettersOpened.includes(letterOpened)) {
            lettersOpened.push(letterOpened);
            updateGuessedLettersDisplay(letterOpened);
        }

        lettersOpened.push(letterOpened);

        // check if any letters match letter guessed and reveal them
        for (let i = 0; i < songAnswer.length; i++) {
            let songLetter = songAnswer[i].toLowerCase();
            if (songLetter === letterOpened) {
                currentSong = currentSong.substring(0, i) + songAnswer[i] + currentSong.substring(i + 1);
            }

            if (!currentSong.includes('*')) {
                explodedWord = true;
                currentSong = songAnswer + ' ';
            }
        }
    }


    // second-level logic for handling the guess: full-word guessing
    function guessSong(songNameGuessed) {
        let sanitizedSongName = songAnswer.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let sanitizedGuess = songNameGuessed.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        let messageElement = document.getElementById('guessMessage');

        if (sanitizedSongName === sanitizedGuess) {
            messageElement.textContent = 'Correct guess!';
            currentSong = songAnswer;
            updateSong();
        } else {
            messageElement.textContent = 'Incorrect guess.';
        }
    }

    // life is a full circle
    initializeGame();
});
