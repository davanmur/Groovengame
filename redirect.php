<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "TeamSixteen16"; // CHANGE
$dbname = "groovengame";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['username'])) { 
  // Retrieve data from the form
  $username = $_POST['username'];
  $area = $_POST['area'];
  $category = $_POST['category'];

  //MERGE WORDS
  $words = [];

  // Retrieve words from 50 different inputs
  for ($i = 1; $i <= 50; $i++) {
    $word = trim($_POST["word$i"]);
    if (!empty($word)) {
        $words[] = $word;
    }
  }
  $wordlist = implode(",", $words);
  
  

  if (empty($username) || empty($area) || empty($category) || empty($wordlist)) {
    header("Location: create.php");
  } else {
    // Prepare and execute SQL query to insert data into the table
    $sql = "INSERT INTO user_categories (username, area, category, wordlist) VALUES ('$username', '$area', '$category', '$wordlist')";

    if ($conn->query($sql) === TRUE) {
      // Redirect to a new page to avoid form resubmission
      // $conn->close();
      header("Location: categories.php");
      exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}


$conn->close();
?>