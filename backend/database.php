<?php

require_once 'config.php';

function getDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
}

    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        if (defined('ENVIRONMENT') && ENVIRONMENT === 'development') {
            die("Database connection failed: " . $conn->connect_error);
        } else {
            exit("An unexpected error occurred. Please try again later.");
        }
    }

    $conn->set_charset("utf8mb4");

    return $conn;
}

?>