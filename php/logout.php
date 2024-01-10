<?php
try {
    session_start();
    session_destroy();
} catch (Exception $e) {
    die('Error: ' . $e->getMessage() . "\n");
}
