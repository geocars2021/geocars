/* re import jquery always!! */
import "../../../jquery/jquery-3.6.0.min.js";
import "../../../jquery/jquery-cookie-1.4.1.min.js";

import
{
    clear_login_session
}
from "../../login/login_session.js";

import 
{ 
    has_connection 
} 
from "../../tool/connection_checker.js"

function conn_error (message) {
    let conn_err = document.createElement("div");
    conn_err.classList.add("connection-error-wrapper-overlay");
    conn_err.innerHTML = 
    "\t <div class=\"connection-error-wrapper\"> \n"+
        "\t\t <div class=\"content-wrapper\"> \n" +
            "\t\t\t <img class=\"dc-icon\" src=\"../../assets/webapp/dc-wifi.png\" alt=\"dc-icon\"> \n"+
            "\t\t\t <span class=\"dc-message\" role=\"text\">"+ `${message}` + "</span> \n" +
        "\t\t </div> \n" +
    "\t </div> \n";
    
    $("body").prepend(conn_err);
}

export function validate_connection () {
    if (!has_connection()){ 
        conn_error("No internet connection.");
        clear_login_session();
        throw new Error("No Internet Access!!!!!");
    }
    return true;
}


// old code
/*

*/
