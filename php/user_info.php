<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    session_start();
    if (!isset($_SESSION['logged_in'])) {
        echo json_encode(['success' => false, 'message' => 'Not logged in.']);
        exit();
    }

    $res = [
        'success' => true,
        'username' => htmlspecialchars($_SESSION['username']),
        'email' => htmlspecialchars($_SESSION['email'])
    ];

    echo json_encode($res);
}
