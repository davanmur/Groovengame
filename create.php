<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="description" content="party games website">
	<meta name="keywords" content="games, word games, party games">
	<meta name="author" content="WebSyx">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GrooveN'Games</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <link href="styles.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<script src="./scripts/themes-script.js"></script>
</head>
<body>
	<div id="creatediv" class="bigContainer">
  <h2>Create a New Catagory:</h2>
    <form id="createform" action="redirect.php" method="post">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username"><br>
        
        <label for="area">Area:</label><br>
        <input type="text" id="area" name="area"><br>
        
        <label for="category">Category:</label><br>
        <input type="text" id="category" name="category"><br>

        <label for="words">Words:</label><br>
        <!-- <textarea id="wordlist" name="wordlist"></textarea><br><br> -->

        <?php
        for ($i = 1; $i <= 50; $i++) {
          echo "<input type='text' name='word$i' placeholder='Word $i'><br>";
        }
        ?>
        
        <input type="submit" value="Submit">
    </form>

    <div id="text">
      Make sure to fill out all the inputs!
    </div>
	</div>


	</body>

</html>