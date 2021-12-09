import "../../../jquery/jquery-3.6.0.min.js";
import { has_connection } from "../../tool/connection_checker.js"

function conn_error (message) {
    let conn_err = document.createElement("div");
    conn_err.id  = "connection-error";
    conn_err.classList.add("connection-error-wrapper");

    conn_err.innerHTML = 
    "<div> \n"+
        "\t\t <div class=\"content-wrapper\"> \n" +
            "\t\t\t <img class=\"dc-icon\" src=\"../../assets/webapp/dc-wifi.png\" alt=\"dc-icon\"> \n"+
            "\t\t\t <span class=\"dc-message\" role=\"text\">"+ `${message}` + "</span> \n" +
        "\t\t </div> \n" +
    "</div> \n";
    
    $("body").prepend(conn_err);
}

export function validate_connection () {
    if (!has_connection()){ 
        conn_error("No internet connection");
        window.location.href = "../../../webapp/signin/";
        return false;
    }
    return true;
}


// old code
/*

*/
