let games = ["guessGame", "hangmanGame", "headBandsGame"];

function rotateGame(forward) {
    if (forward == true){
        let temp = games[2];
        games[2] = games[1];
        games[1] = games[0];
        games[0] = temp;

        const container = document.getElementById("bigContainer");
        const gameFront = document.getElementById(games[0]);
        const gameSecond = document.getElementById(games[1]);

        container.insertBefore(gameFront, gameSecond);
    } else {
        let temp = games[0];
        games[0] = games[1];
        games[1] = games[2];
        games[2] = temp;

        console.log(games);
        const container = document.getElementById("bigContainer");
        const gameFront = document.getElementById(games[0]);
        const gameSecond = document.getElementById(games[1]);
        const gameThird = document.getElementById(games[2]);

        container.insertBefore(gameSecond, gameThird);
        container.insertBefore(gameFront, gameSecond);   
    }
}