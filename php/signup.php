<?php
session_start();

$dbhost = 'localhost';
$dbname   = 'groovengame';
$dbuser = 'root';
$dbpass = 'TeamSixteen16';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $dbconn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    } catch (Exception $e) {
        die('Error: ' . $e->getMessage() . "\n");
    }

    $email = filter_var(htmlspecialchars($_POST['email']), FILTER_SANITIZE_EMAIL);
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);

    // check if email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'reason' => 'invalid_email']);
        exit();
    }

    $hash = password_hash($password, PASSWORD_BCRYPT);

    // check if user with email already exists
    $stmt = $dbconn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user) {
        echo json_encode(['success' => false, 'reason' => 'email']);
        exit();
    }

    // check if user with username already exists
    $stmt = $dbconn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user) {
        echo json_encode(['success' => false, 'reason' => 'username']);
        exit();
    }

    // create new user
    $stmt = $dbconn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    try {
        $stmt->execute([$email, $username, $hash]);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        die('Error: ' . $e->getMessage() . "\n");
    }
}
