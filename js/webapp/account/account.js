/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";

import 
{
    get_login_cred,
    redirect_if_login_to ,
}
from "../login/login_session.js";

redirect_if_login_to("#","../../webapp/signin");

import "../sidebar/sidebar.js";

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

import 
{
    insert_activity
}
from "./activity_list.js";

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
    if (snapshot){
        $("#info-subscription").text(snapshot.plan);
    
        // email
        $("#info-email").text(snapshot.email);

        // contact
        $("#info-contact").text(snapshot.contact);
    
        // password :) hihihihihi
        // do not fetch!! use ********* instead
        // we did not store password!!
        $("#info-password").text("********");
    
        // address
        // late initialized
        $("#info-address").text(snapshot.address);

        // activity list
        if (snapshot.activities.length > 0) {
            let act_list;
            try {
                $("#empty-activity")
                .remove();
            }catch(err){}

            act_list = snapshot.activities;
            
            for (let idx = 0; idx < act_list.length;idx++) {
                insert_activity(
                    act_list[idx].date,
                    act_list[idx].description,
                );
            }
        }
    }

    load_finish();
}

// load_finish();


// on_update(get_login_cred(),(data) => {
//     // display changes
//     load_content();
// });

load_content();