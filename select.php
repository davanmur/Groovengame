<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<script>console.log('test');</script>";
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

// Define the category you want to retrieve wordlist for
$category = $_GET['category'];

// Fetch 'wordlist' based on the specified 'category'
$sql = "SELECT wordlist FROM categories WHERE category = '$category' 
        UNION 
        SELECT wordlist FROM user_categories WHERE category = '$category'";
$result = $conn->query($sql);

$wordlist = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Split the 'wordlist' into an array
        $words = explode(",", $row["wordlist"]);
        
        // Merge the words with the existing 'wordlist' array
        $wordlist = array_merge($wordlist, $words);
    }
}

// Convert the PHP array to a JSON object
$json_data = json_encode([$category => $wordlist], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Output JSON to a file
$file_path = './GetTheLetter/wordlist.json'; // Path to your JSON file
file_put_contents($file_path, $json_data);

$conn->close();
?>