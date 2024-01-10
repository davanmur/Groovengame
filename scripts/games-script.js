const gameDescriptions = {
    "GET THE LETTER!": "GET THE LETTER! is a word game where players try to find and arrange letters to form words.",
    "CLASSIC HANGMAN": "CLASSIC HANGMAN is a word-guessing game where players try to guess a word by suggesting letters.",
    "GUESS THE WORD!": "GUESS THE WORD! is a word puzzle game where players guess a word based on clues.",
    "HEADBANDS": "HEADBANDS is a guessing game where players wear a headband with a word and try to guess it with hints from others."
};

const gameRules = {
    "GET THE LETTER!": "Rules for GET THE LETTER! - Requires at least 2 players to play. Insert rules here.",
    "CLASSIC HANGMAN": "Rules for CLASSIC HANGMAN - Requires at least 2 players to play. Insert rules here.",
    "GUESS THE WORD!": "Rules for GUESS THE WORD! - Requires at least 2 players to play. Insert rules here.",
    "HEADBANDS": "Rules for HEADBANDS - Requires at least 2 players to play. Insert rules here.",
};

function displayDescription(game) {
    // Changes description when different game is selected
    const description = gameDescriptions[game];
    if (description) {

        const rules = gameRules[game];
        const demoPlaceholder = "Demo of the game";

        const content = `
    <h2>${game}</h2>
    <br>
    <p>${description}</p>
    <br>
    <h3>*Rules*</h3>
    <p>${rules}</p>
    <br>
    <div class="game-demo">${demoPlaceholder}</div>
    `;

        $("#description-div").html(content);
    }
}

$(document).ready(function () {
    // When game is selected
    $("#games-div ol li").click(function () {
        $("#games-div ol li").removeClass("active");
        $(this).addClass("active");
        const selectedGame = $(this).data("game");
        displayDescription(selectedGame);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("playerModal");
    var btn = document.getElementById("addPlayerBtn");
    var span = document.getElementsByClassName("close")[0];
    var saveBtn = document.getElementById("savePlayerBtn");
    var maxPlayers = 5; // Maximum number of players

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    saveBtn.onclick = function () {
        var playerDiv = document.getElementById('games-player-div');
        var currentPlayers = playerDiv.getElementsByClassName('player-container').length;

        if (currentPlayers >= maxPlayers) {
            alert("Maximum of " + maxPlayers + " players reached.");
            modal.style.display = "none";
            return;
        }

        var nickname = document.getElementById('playerNickname').value.trim();

        if (!nickname) {
            nickname = getNextDefaultPlayerName(playerDiv);
        }

        if (!isNicknameTaken(nickname, playerDiv)) {
            var playerContainer = document.createElement('div');
            playerContainer.className = 'player-container';

            var newPlayer = document.createElement('h4');
            newPlayer.textContent = nickname;

            playerContainer.appendChild(newPlayer);
            playerContainer.addEventListener('click', function (e) {
                if (e.target === newPlayer) {
                    playerDiv.removeChild(playerContainer);
                    resetDefaultPlayerNames(playerDiv);
                }
            });

            playerDiv.insertBefore(playerContainer, playerDiv.querySelector('.button-wrapper'));

            modal.style.display = "none";
            document.getElementById('playerNickname').value = '';
        } else {
            alert("This nickname is already taken. Please choose another one.");
        }
    };

    function isNicknameTaken(nickname, playerDiv) {
        var players = playerDiv.getElementsByClassName('player-container');
        for (var i = 0; i < players.length; i++) {
            if (players[i].textContent.toUpperCase() === nickname.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    function getNextDefaultPlayerName(playerDiv) {
        var existingPlayers = playerDiv.getElementsByClassName('player-container');
        var defaultPlayerNum = 1;
        while (true) {
            let found = false;
            for (let player of existingPlayers) {
                if (player.textContent === 'Player #' + defaultPlayerNum) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return 'Player #' + defaultPlayerNum;
            }
            defaultPlayerNum++;
        }
    }

    function resetDefaultPlayerNames(playerDiv) {
        var existingPlayers = playerDiv.getElementsByClassName('player-container');
        var defaultPlayerNum = 1;
        for (let player of existingPlayers) {
            if (player.textContent.startsWith('Player #')) {
                player.getElementsByTagName('h4')[0].textContent = 'Player #' + defaultPlayerNum++;
            }
        }
    }
});


document.getElementById('startGameBtn').addEventListener('click', function () {
    var players = [];
    var playerElements = document.getElementById('games-player-div').getElementsByTagName('h4');
    for (var i = 0; i < playerElements.length; i++) {
        players.push(playerElements[i].textContent);
    }

    if (players.length == 0) {
        alert('You need at least 1 player');
        return;
    }

    // make post request to save_players to save players
    $.ajax({
        type: "POST",
        url: "php/save_players.php",
        data: {
            players: players,
        },
        success: function (response) {
            let resJson = JSON.parse(response);
            console.log(resJson);
            if (resJson.success) {
                window.location.href = 'play-game.html';
            } else {
                alert('There was an error saving the players.');
            }
        }
    });
});

