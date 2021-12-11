/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";


export function load_finish () {
    let ll = $("#lazy-loading-overlay");
    try {
        ll.remove();
    }
    catch($err) {
        console.log("already loaded!");
    }
}


