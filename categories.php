<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="description" content="party games website">
	<meta name="keywords" content="games, word games, party games">
	<meta name="author" content="WebSyx">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>GrooveN'Games</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<link href="styles.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<script src="./scripts/themes-script.js"></script>
</head>

<body>
	<div id="categories" class="bigContainer">
		<!-- header -->
		<div class="d-flex justify-content-between banner">
			<div class="d-flex banner-left-section align-items-top">
				<div>
					<div class="d-flex align-items-center">
						<a href="index.html"><img class="back-arrow" src="img/left-arrow.png"></a>
						<h1 class="banner-title">CATEGORIES!</h1>
					</div>
					<h2 class="banner-description">Want more themes? Create them youself!</h2>
				</div>
			</div>
			<div class="d-flex justify-content-evenly align-items-center banner-links">
				<a href="games.html">GAMES</a>
				<a href="stats.php">LEADERBOARDS</a>
				<a href="profile.html">PROFILE</a>
			</div>
		</div>

		<hr class="header-hr">

		<div id="areas-div" class="col div1">
			<ol>
			</ol>


		</div>

		<div id="categories-div" class="col div2">
			<ol>
			</ol>
		</div>

		<div id="misc-div" class="col div3">
			<button id="create"><a href="create.php">Create category</a></button>
		
			<button id="select">Select Category</button>
		</div>

	</div>

	<script>
		document.getElementById("select").addEventListener("click", function() {
    // Get the selected category
    var selected_category = $("#categories-div ol li.active").attr("id");
    
    // Send a request to the PHP script to generate the JSON with the selected category
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "select.php?category=" + selected_category, true); // Append the category as a query parameter
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
					alert(selected_category.replace(/_/g, ' ').toUpperCase() + " selected!");
        }
    };
    xhr.send();

		localStorage.setItem('selected_category', selected_category.replace(/_/g, ' ').toUpperCase());
});

    </script>

	<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	// Database connection details
	$servername = "localhost";
	$username = "root";
	$password = "TeamSixteen16"; // CHANGE
	$dbname = "groovengame";

	// Create a connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check the connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}


	// Fetch data from the database
	$sql = "SELECT DISTINCT area FROM categories UNION SELECT DISTINCT area FROM user_categories";

	$result = $conn->query($sql);

	echo "<script>";

	if ($result !== false) {
		// Check the number of rows if the result is not false
		$row_count = $result->num_rows;

		while ($row = $result->fetch_assoc()) {
			echo '$("#areas-div ol").append("<li id=\'' . $row["area"] . '\'>" + "' . $row["area"] . '".replace(/_/g, \' \').toUpperCase() + "</li>");';
		}
		echo "$('#areas-div ol li:first').addClass('active');";
	}

	// Fetching data from the 'categories' table based on the 'area' value
	$sql = "SELECT area, GROUP_CONCAT(category) as category
		FROM (
				SELECT area, category FROM categories
				UNION ALL
				SELECT area, category FROM user_categories
		) merged_categories
		GROUP BY area;";
	$result = $conn->query($sql);

	// Creating an array to store area-category mappings
	$areaCategories = [];

	if ($result !== false) {
		while ($row = $result->fetch_assoc()) {
			// echo "console.log('" . $row["category"]. " ');";
			$areaCategories[$row["area"]] = $row["category"];
		}
	}

	echo "</script>";
	// Convert the PHP array to a JSON object
	$json_data = json_encode($areaCategories);


	// Output JSON to a file
	$file_path = './scripts/categories.json'; // Path to your JSON file
	file_put_contents($file_path, $json_data);

	$conn->close();
	?>
</body>

</html>