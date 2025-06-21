<?php
$DB_HOST = 'localhost';
$DB_USER = 'root'; 
$DB_PASS = '';
$DB_NAME = 'simple_notes_db';
$ENVIRONMENT = 'development';
$BASE_URL = 'http://localhost/simple-notes-app/public/';
date_default_timezone_set('Africa/Nairobi');
if ($ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../logs/php_errors.log');
}

?>