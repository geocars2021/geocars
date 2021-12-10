/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";
import 
{ 
    get_company_profile_images_by_uid 
}
from "../connection_handler/connection.js";


import
{
    get_login_cred      ,
    clear_login_session ,
}
from "../login/login_session.js";

import 
{ 
    logout 
}
from "../pop_ups/logout/logout.js"; 




$("document").ready( async (e) => {
    
    /* set avatar icon (sidebar) */
    let image = await get_company_profile_images_by_uid(get_login_cred());
    if (image.dp != null)
        $("#nav-user-avatar").css("background",`url("${image.dp}")`);
    else 
        $("#nav-user-avatar").css("background",`url("../../assets/webapp/avatar-default.png")`);
    // remove loading class
    $("#nav-user-avatar").removeClass("loading");

    /* add event on exit button*/ 
    $("#exit-logout").click((e) => {
        logout(
            "Confirm logout?",
            (popup) => {
                // positive
                clear_login_session();
                window.location.href = "../../webapp/signin/";
            },
            (popup) => {
                // negative
                popup.remove();
            }
        )
    });
});


