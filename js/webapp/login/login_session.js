/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";
import 
{ 
    get_data_by_id 
} 
from "../connection_handler/connection.js";

export function get_login_cred () {
    let u = $.cookie("uid");
    return u;
}

export function save_login_session (uid,is_saved) {

    let u  = $.cookie("uid");
    let s  = $.cookie("save"); 

    if ((u == null || u == undefined) || uid != u) {
        $.cookie("uid",uid , {
            path : "/"
        });
    }
    if ((s == null || s == undefined) || is_saved != s) {
        $.cookie("save", is_saved , {
            path : "/"
        });
    }
}


export async function is_already_login () {
    let u = $.cookie("uid");
    let s = $.cookie("save"); 
    if (!(u == null || u == undefined) && !(s == null || s == undefined)) {
        if (await get_data_by_id(u) != null && s == "true")
            return true;
    }
    return false;
}

export async function redirect_if_login_to (path,otherwise) {
    if(await is_already_login())
        window.location.href = path;
    else 
        if(otherwise != null && otherwise != undefined)
            window.location.href = otherwise;
}



export function clear_login_session () {
    $.cookie("uid"  , null , {
        path : "/"
    });
    $.cookie("save" , null , {
        path : "/"
    }); 
}


