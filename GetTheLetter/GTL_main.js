// main.js
document.addEventListener('DOMContentLoaded', () => {
    let currentSongs = []; //arr for current word
    let lettersOpened = []; // var for current guessed letters
    let players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5']; // tmp playerlist
    let points = new Array(players.length).fill(0); // arr for points for each player
    let currentPlayerIndex = 0; // index for player
    let songs = []; // arr for the entire active wordlist

    document.getElementById('play-game-guess-button').addEventListener('click', handleGuess);

    // guess on enter pressed
    document.getElementById('play-game-word-guess').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('play-game-guess-button').click();
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
        loadPlayers();
        songs = selectRandomSongs(allSongs, 10);
        console.log(songs);
        prepareSongsForDisplay();
        updateSongLists();
    }

    function loadPlayers() {
        $.ajax({
            type: "GET",
            url: "php/save_players.php",
            success: function (response) {
                let resJson = JSON.parse(response);
                if (resJson.success) {
                    players = resJson.players;
                    console.log(players);
                    updateScoreboard();
                    updateCurrentPlayerDisplay();
                } else {
                    console.log(resJson);
                    alert('Error loading players');
                }
            }
        });
    }

    function selectRandomSongs(allSongs, count) {
        return allSongs.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    // encrypts all words
    function prepareSongsForDisplay() {
        currentSongs = songs.map(song => song.replace(/[a-zA-Z0-9]/g, '*')); // arrow function + regex change all alphanumeric to *
    }


    // displays the current player
    function updateCurrentPlayerDisplay() {
        let currentPlayerDisplay = document.getElementById('currentPlayer');
        currentPlayerDisplay.textContent = `${players[currentPlayerIndex]}'s Turn!`;
    }

    // fills the list dedicated for the words
    function updateSongLists() {
        let list1 = document.getElementById('list1');

        list1.innerHTML = '';

        currentSongs.forEach(song => {
            let li = document.createElement('li');
            li.textContent = song;
            list1.appendChild(li);
        });
    }

    function updateScoreboard() {
        document.getElementById('pointsDisplay').innerHTML = players.map((player, index) => `${player}: ${points[index]}`).join('<br>');
    }

    // displays the already-guessed letters
    function updateGuessedLettersDisplay(newLetter) {
        let displayElement = document.getElementById('play-game-letters-guessed');

        if (displayElement.textContent.length > 17) {
            displayElement.textContent += ', ';
        }
        displayElement.textContent += newLetter;
    }


    // first-level logic for handling the guess
    function handleGuess() {
        let guessInput = document.getElementById('play-game-word-guess').value.trim();
        if (guessInput.length === 0) {
            return;
        }

        if (guessInput.length === 1) {
            openLetter(guessInput);
            moveToNextPlayer();
        } else {
            let parts = guessInput.split(' ');
            let guessedSongNum = parseInt(parts[0], 10) - 1;

            if (isNaN(guessedSongNum)) {
                let messageElement = document.getElementById('guessMessage');
                messageElement.textContent = 'Enter a number';
            } else {
                let songNameGuessed = parts.slice(1).join(' ');
                guessSong(guessedSongNum, songNameGuessed);
                moveToNextPlayer();
            }
        }

        updateSongLists();
        document.getElementById('play-game-word-guess').value = '';
    }

    function moveToNextPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        updateCurrentPlayerDisplay();
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
        songs.forEach((song, i) => {
            for (let j = 0; j < song.length; j++) {
                let songLetter = song[j].toLowerCase();
                if (currentSongs[i][j] === '*' && songLetter === letterOpened) {
                    currentSongs[i] = currentSongs[i].substring(0, j) + song[j] + currentSongs[i].substring(j + 1);
                    pointsEarned += 1;

                    // 爆
                    if (!currentSongs[i].includes('*')) {
                        explodedWord = true;
                        currentSongs[i] = song + ' ';
                    }
                }
            }
        });

        if (explodedWord) {
            points[currentPlayerIndex] -= 10; // 爆
            points[currentPlayerIndex] += pointsEarned; // 如爆
        } else {
            points[currentPlayerIndex] += pointsEarned;
        }

        updateScoreboard();
        return pointsEarned;
    }


    // second-level logic for handling the guess: full-word guessing
    function guessSong(guessedSongNum, songNameGuessed) {
        let point = 0;
        let sanitizedSongName = songs[guessedSongNum].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let sanitizedGuess = songNameGuessed.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        let messageElement = document.getElementById('guessMessage');

        if (guessedSongNum >= 0 && guessedSongNum < songs.length && sanitizedSongName === sanitizedGuess) {
            let missingLetters = currentSongs[guessedSongNum].split('*').length - 1;
            let pointsEarned = 5 + missingLetters;
            currentSongs[guessedSongNum] = songs[guessedSongNum] + ' ';

            points[currentPlayerIndex] += pointsEarned;
            messageElement.textContent = 'Correct guess!';
        } else {
            messageElement.textContent = 'Incorrect guess.';
        }

        updateScoreboard();
        return point;
    }

    // life is a full circle
    initializeGame();
});
