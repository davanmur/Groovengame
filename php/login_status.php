<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    session_start();
    if (isset($_SESSION['logged_in'])) {
        echo json_encode(array('logged_in' => true));
    } else {
        echo json_encode(array('logged_in' => false));
    }
}
