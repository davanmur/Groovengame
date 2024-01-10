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

    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    // get user with same email
    $stmt = $dbconn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // check if any users have email
    if (!$user) {
        echo json_encode(['success' => false, 'reason' => 'email']);
        exit();
    }

    // check input password against stored
    $hash = $user['password'];

    if (password_verify($password, $hash)) {
        $_SESSION['logged_in'] = true;
        $_SESSION['email'] = $email;
        $_SESSION['username'] = $user['username'];
        echo json_encode(array('success' => true));
        exit();
    }

    echo json_encode(['success' => false, 'reason' => 'password']);
}
