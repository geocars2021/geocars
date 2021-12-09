/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";
import "../sidebar/sidebar.js";

import
{
    get_login_cred
}
from "../login/login_session.js";

import 
{ 
    load_finish 
} 
from "../lazy_loading/lazy_loading.js";

import
{
    on_update       ,
    get_data_by_id  ,
    get_company_profile_images_by_uid
}
from "../connection_handler/connection.js";

/*
    call once to reduce traffic
*/ 

let uid , snapshot , profile ;

async function load_content() {

    
    uid      = get_login_cred();
    snapshot = await get_data_by_id(uid);
    profile  = await get_company_profile_images_by_uid(uid);

    // company name
    if (snapshot) {
        $("#user-name").text(snapshot.name);
    }
    // display pic
    if (profile.dp) {
        $("#dp-image")
        .removeClass("loading")
        .css("background",`url("${profile.dp}")`);
    }
    // cover pic
    if (profile.cover) {
        $("#cover-image")
        .removeClass("loading")
        .css("background",`url("${profile.cover}")`);
    }
    // subscription
    if (snapshot)
        $("#info-subscription").text(snapshot.plan);
    
    // email
    if (snapshot)
        $("#info-email").text(snapshot.email);
    
    // password :) hihihihihi
    if (snapshot) 
        // do not fetch!! use ********* instead
        // we did not store password
        $("#info-password").text("********");
    
    // address
    // late initialized
    if (snapshot.address)
        $("#info-address").text(snapshot.address);

    load_finish();

}

// load_finish();


on_update(get_login_cred(),(data) => {
    // display changes
    load_content();
});

load_content();