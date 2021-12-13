/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";

import 
{
    get_login_cred       ,
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
    add_car_view
}
from "./pop_ups/car_adder.js"


let uid , add_new_car_btn;

uid = get_login_cred();

// add car
add_new_car_btn = $("#add-new-car");
add_new_car_btn.click(() => {
    add_car_view(
        uid,
        (e) => {
            e.remove();
        },
        (e,data) => {
            console.log(data);
            e.remove();
        }
    );
});


load_finish();