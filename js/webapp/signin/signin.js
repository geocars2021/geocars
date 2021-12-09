/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";

import 
{
    save_login_session   ,
    redirect_if_login_to ,
}
from "../login/login_session.js";


redirect_if_login_to("../../webapp/dashboard/");

import 
{ 
    get_company_id_by_email , 
    get_data_by_id          ,

}
from "../connection_handler/connection.js";

import 
{ 
    sha256 
} 
from "../tool/hasher.js";

import 
{ 
    validate_connection 
} 
from "../pop_ups/connection_error/connection_error.js";

validate_connection();

let is_disabled     = false;

let email_input    = $("#email-input");
let val_email      = $("#validate-email");
let password_input = $("#password-input");
let val_pass       = $("#validate-password");
let remember       = $("#remember-me");
let btn_signin     = $("#btn-signin");



function validate_form () {
    let has_empty = false;
    if (email_input.val().length <= 0) {
        val_email.text("*Empty username field");
        has_empty = true;
    }
    else{
        val_email.text("");
    }
    if (password_input.val().length <= 0) {
        val_pass.text("*Empty password field");
        has_empty = true;
    }
    else {
        val_pass.text("");
    }
    return has_empty;
}

function invalid_username_or_password () {
    val_email.text("*Invalid username or password");
    password_input.val("")
    
}

function has_uid (uid) {
    return ! (
        uid === null || 
        uid === undefined
    )
}

function has_snapshot (snapshot) {
    return ! (
        snapshot === null || 
        snapshot === undefined
    )
}

function clear_form () {
    email_input.val("");
    password_input.val("");
}

remember.click((e) => {
    remember.val(
        remember.val() === "false"? true : false
    )
});

btn_signin.click(async (e) => {
    let is_invalid , email , password;

    if (is_disabled)
        return;

    is_invalid = validate_form();
    if (is_invalid)
        return;

    is_disabled = true;
    email = email_input.val();
    password = password_input.val();

    let user_id = await get_company_id_by_email(email);

    if (!has_uid(user_id))
        return invalid_username_or_password();

    let snapshot = await get_data_by_id(user_id);

    if (!has_snapshot(snapshot))
        return invalid_username_or_password();

    let salt , passkey , computed;

    salt    = snapshot.salt;
    passkey = snapshot.passkey;

    // passkey = sha256 ( salt + desired_Password )
    computed = await sha256(salt + password);
    
    if (computed !== passkey)
        return invalid_username_or_password();
    
    /* otherwise, user found !!! */

    // TODO: save sesssion cookies | status : finish
    
    save_login_session(user_id,remember.val());
    clear_form();

    window.location.href = "../../webapp/dashboard/";

});



