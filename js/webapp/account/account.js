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
    on_company_update  ,
    get_data_by_id     ,
    get_company_profile_images_by_uid
}
from "../connection_handler/connection.js";

import 
{
    clear_list      ,
    insert_activity ,
}
from "./activity_list.js";

 

let uid;

uid = get_login_cred();

async function load_content(snapshot) {
    /*
        call once to reduce traffic
        | let on_company_update hanldes changes
        ;
    */

    // cover pic
    if (snapshot.cover) {
        $("#cover-image")
        .removeClass("loading")
        .css("background",`url("${snapshot.cover}")`);
    }

    // display pic
    if (snapshot.dp) {
        $("#dp-image")
        .removeClass("loading")
        .css("background",`url("${snapshot.dp}")`);
    }

    // company name
    if (snapshot.name) {
        $("#user-name").text(snapshot.name);
    }


    if (snapshot){
        // subscription
        $("#info-subscription").text(snapshot.plan);
    
        // email
        $("#info-email").text(snapshot.email);

        // contact
        $("#info-contact").text(snapshot.contact);
    
        // password :) hihihihihi
        // do not fetch!! use ********* instead
        // we did not store user's password!!
        $("#info-password").text("********");
    
        // address
        // late initialized
        $("#info-address").text(snapshot.address);

        // activity list
        // if not empty!
        // otherwise show empty list instead | default
        if (snapshot.activities && snapshot.activities.length > 0) {

            let act_list;
    
            try {
                // hide only ampty activity
                $("#empty-activity")
                .css("display", "none");
            }catch(err){}

            clear_list();

            act_list = snapshot.activities;
            
            for (let idx = 0; idx < act_list.length;idx++) {
                insert_activity(
                    act_list[idx].date,
                    act_list[idx].description,
                );
            }
        }
        else {
            
            clear_list();

            $("#empty-activity")
            .css("display","flex");
           
        }
    }

    load_finish();
}



on_company_update(uid,(data) => {
    
    load_content(data);
});

