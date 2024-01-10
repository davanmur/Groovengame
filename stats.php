<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Statistics</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <link rel="stylesheet" href="./styles.css">
</head>

<body>
  <div id="bigContainer" class="bigContainer">
    <div class="d-flex justify-content-between banner">
      <div class="d-flex banner-left-section align-items-top">
        <div>
          <div class="d-flex align-items-center">
            <a href="index.html"><img class="back-arrow" src="img/left-arrow.png"></a>
            <h1 class="banner-title">Leaderboard</h1>
          </div>
          <h2 class="banner-description">How good are you?</h2>
        </div>
      </div>
      <div class="d-flex justify-content-evenly align-items-center banner-links">
        <a href="categories.php">Categories</a>
        <a href="games.html">Choose Game</a>
        <a href="profile.html">Profile</a>
      </div>
    </div>
    <div class="changeGame" onclick="rotateGame(false)">&#60;</div>
    <div id="guessGame" class="gameStatsContainer">
      <div class="gameTitle">
        Get the Letter
      </div>
      <table class="guessStats">
        <tr>
          <th class="guessName">Name</th>
          <th class="guessScore">Score</th>
        </tr>
        <tr>
          <td id="guessName1" class="guessName"></td>
          <td id="guessScore1" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName2" class="guessName"></td>
          <td id="guessScore2" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName3" class="guessName"></td>
          <td id="guessScore3" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName4" class="guessName"></td>
          <td id="guessScore4" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName5" class="guessName"></td>
          <td id="guessScore5" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName6" class="guessName"></td>
          <td id="guessScore6" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName7" class="guessName"></td>
          <td id="guessScore7" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName8" class="guessName"></td>
          <td id="guessScore8" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName9" class="guessName"></td>
          <td id="guessScore9" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName10" class="guessName"></td>
          <td id="guessScore10" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName11" class="guessName"></td>
          <td id="guessScore11" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName12" class="guessName"></td>
          <td id="guessScore12" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName13" class="guessName"></td>
          <td id="guessScore13" class="guessScore"></td>
        </tr>
        <!-- <tr>
          <td id="guessName14" class="guessName"></td>
          <td id="guessScore14" class="guessScore"></td>
        </tr>
        <tr>
          <td id="guessName15" class="guessName"></td>
          <td id="guessScore15" class="guessScore"></td>
        </tr> -->
      </table>
    </div>
    <div id="hangmanGame" class="gameStatsContainer">
      <div class="gameTitle">
        Hangman
      </div>
      <table class="guessStats">
        <table class="guessStats">
          <tr>
            <th class="guessName">Name</th>
            <th class="guessScore">Score</th>
          </tr>
          <tr>
            <td id="hangmanName1" class="guessName"></td>
            <td id="hangmanScore1" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName2" class="guessName"></td>
            <td id="hangmanScore2" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName3" class="guessName"></td>
            <td id="hangmanScore3" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName4" class="guessName"></td>
            <td id="hangmanScore4" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName5" class="guessName"></td>
            <td id="hangmanScore5" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName6" class="guessName"></td>
            <td id="hangmanScore6" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName7" class="guessName"></td>
            <td id="hangmanScore7" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName8" class="guessName"></td>
            <td id="hangmanScore8" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName9" class="guessName"></td>
            <td id="hangmanScore9" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName10" class="guessName"></td>
            <td id="hangmanScore10" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName11" class="guessName"></td>
            <td id="hangmanScore11" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName12" class="guessName"></td>
            <td id="hangmanScore12" class="guessScore"></td>
          </tr>
          <tr>
            <td id="hangmanName13" class="guessName"></td>
            <td id="hangmanScore13" class="guessScore"></td>
          </tr>
        </table>
    </div>
    <div id="headBandsGame" class="gameStatsContainer">
      <div class="gameTitle">
        Guess the Word
      </div>
      <table class="guessStats">
        <tr>
          <th class="guessName">Name</th>
          <th class="guessScore">Score</th>
        </tr>
        <tr>
          <td id="headBandsName1" class="guessName"></td>
          <td id="headBandsScore1" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName2" class="guessName"></td>
          <td id="headBandsScore2" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName3" class="guessName"></td>
          <td id="headBandsScore3" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName4" class="guessName"></td>
          <td id="headBandsScore4" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName5" class="guessName"></td>
          <td id="headBandsScore5" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName6" class="guessName"></td>
          <td id="headBandsScore6" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName7" class="guessName"></td>
          <td id="headBandsScore7" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName8" class="guessName"></td>
          <td id="headBandsScore8" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName9" class="guessName"></td>
          <td id="headBandsScore9" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName10" class="guessName"></td>
          <td id="headBandsScore10" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName11" class="guessName"></td>
          <td id="headBandsScore11" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName12" class="guessName"></td>
          <td id="headBandsScore12" class="guessScore"></td>
        </tr>
        <tr>
          <td id="headBandsName13" class="guessName"></td>
          <td id="headBandsScore13" class="guessScore"></td>
        </tr>
      </table>
    </div>
    <div class="changeGame" onclick="rotateGame(true)"> &#62;</div>

  </div>

  <script src="statsJavaScript.js"></script>
  <?php
  // Database connection details
  $servername = "localhost";
  $username = "root";
  $password = "TeamSixteen16";
  $dbname = "groovengame";

  // // Create a connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // // Check the connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Fetch data from the database
  $sql0 = "SELECT userName, score FROM leaderboards WHERE gameName = 'getTheLetter' ORDER BY score DESC LIMIT 13";
  $result0 = $conn->query($sql0);
  $sql1 = "SELECT userName, score FROM leaderboards WHERE gameName = 'hangman' ORDER BY score DESC LIMIT 13";
  $result1 = $conn->query($sql1);
  $sql2 = "SELECT userName, score FROM leaderboards WHERE gameName = 'headBands' ORDER BY score DESC LIMIT 13";
  $result2 = $conn->query($sql2);

  // Check if the query was successful
  if ($result0 && $result1 && $result2) {
    // Loop through the result set
    $counter = 1;
    echo "<script>";
    while ($row = $result0->fetch_assoc()) {
      $username = $row["userName"];
      $score = $row["score"];

      // Update HTML elements dynamically
      echo "document.getElementById('guessName$counter').innerText = '$username';";
      echo "document.getElementById('guessScore$counter').innerText = '$score';";

      $counter++;
    }

    $counter = 1;
    while ($row = $result1->fetch_assoc()) {
      $username = $row["userName"];
      $score = $row["score"];

      // Update HTML elements dynamically
      echo "document.getElementById('hangmanName$counter').innerText = '$username';";
      echo "document.getElementById('hangmanScore$counter').innerText = '$score';";

      $counter++;
    }

    $counter = 1;
    while ($row = $result2->fetch_assoc()) {
      $username = $row["userName"];
      $score = $row["score"];

      // Update HTML elements dynamically
      echo "document.getElementById('headBandsName$counter').innerText = '$username';";
      echo "document.getElementById('headBandsScore$counter').innerText = '$score';";

      $counter++;
    }
    echo "</script>";

    // Free the result set
    $result->free();
  } else {
    // Handle query error if needed
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  // Close the database connection
  $conn->close();
  ?>
</body>

</html>