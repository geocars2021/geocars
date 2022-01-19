<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if (version_compare(phpversion(), '5.4.0', '<')) {
        if(session_id() == '') {
            session_start();
        }
    }
    else {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    $UPLOAD_ONLINEPATH = "http://localhost/geocars/";

    $HOST = "localhost";
    $USER = "root";
    $PASS = "";
    $DB   = "geocarsdb";

    if (!isset($CONN)) { 

        $CONN = new mysqli(
            $HOST , 
            $USER ,
            $PASS ,
            $DB
        );

        if ($CONN->connect_error)
            die("ConnectionError: " . $CONN->error);
    }
    
?>