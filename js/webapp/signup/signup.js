import "../../jquery/jquery-3.6.0.min.js";
import 
{ 
    get_company_id_by_email , 
    save_new_company        ,
} 
from "../connection_handler/connection.js";

import 
{ 
    sha256 
} 
from "../tool/hasher.js";

import 
{ 
    generate_salt 
} 
from "../tool/salt_generator.js";

import 
{ 
    message_box
} 
from "../pop_ups/message_box/message_box.js";

import 
{ 
    validate_connection 
} 
from "../pop_ups/connection_error/connection_error.js";

validate_connection();

let is_disabled     = false;

let email_input     = $("#email-input");
let val_email       = $("#validate-email");

let company_input   = $("#company-input");
let val_company     = $("#validate-company");

let password_input  = $("#password-input");
let val_password    = $("#validate-password");

let confirm_password_input = $("#confirm-password-input");
let val_confirm_password   = $("#validate-confirm-password");
let btn_signup = $("#btn-signup");


function validate_form () {
    let has_empty = false;
    if (email_input.val().length <= 0) {
        val_email.text("*Empty username field");
        has_empty = true;
    }
    else{
        val_email.text("");
    }
    if (company_input.val().length <= 0) {
        val_company.text("*Empty company field");
        has_empty = true;
    }
    else{
        val_company.text("");
    }
    if (company_input.val().length < 4) {
        val_company.text("*Invalid company name");
        has_empty = true;
    }
    else{
        val_company.text("");
    }
    if (password_input.val().length <= 0) {
        val_password.text("*Empty password field");
        has_empty = true;
    }
    else if (
        (password_input.val().length < 8)
    ) {
        val_password.text("*Invalid password length");
        has_empty = true;
    }
    else {
        val_password.text("");
    }
    if (confirm_password_input.val().length <= 0) {
        val_confirm_password.text("*Empty confirm password field");
        has_empty = true;
    }
    else {
        val_confirm_password.text("");
    }
    return has_empty;
}

function email_in_use () {
    val_email.text("*Email is already used");
} 

function password_not_match() {
    val_confirm_password.text("*Password not matched");
}

function clear_form () {
    email_input.val("");
    company_input.val("");
    password_input.val("");
    confirm_password_input.val("");
}

btn_signup.click( async (e) => {
    
    validate_connection(); // ensure stabe connection

    let is_invalid , email , name ,password , confirm_pass , salt , passkey;
    
    if (is_disabled)
        return;

    is_invalid = validate_form();
    if (is_invalid)
        return;
    
    is_disabled = true;

    email = email_input.val();
    name  = company_input.val();

    let uid = await get_company_id_by_email(email);

    if (uid)
        return email_in_use ();
    
    password = password_input.val();
    confirm_pass = confirm_password_input.val();

    if (password !== confirm_pass) 
        return password_not_match()
    
    salt = generate_salt(8);

    passkey = await sha256(salt + password);
    
    await save_new_company(email,name,salt,passkey);
    clear_form();
    message_box("Registration successful!",(popup) => {
        popup.remove();
        window.location.href = "../../webapp/signin/";
    });
});

