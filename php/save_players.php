<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $players = $_POST['players'];

    try {
        // set players session variable
        $_SESSION['players'] = $players;
    } catch (Exception $e) {
        echo json_encode(['success' => false]);
    }

    echo json_encode(['success' => true]);
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // return players for GET request
    if (isset($_SESSION['players'])) {
        echo json_encode(['success' => true, 'players' => $_SESSION['players']]);
    } else {
        echo json_encode(['success' => false]);
    }
}
