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
    get_car_by_status,
    insert_new_car,
    on_car_update,
}
from "../connection_handler/connection.js";

import
{
    message_box
}
from "../pop_ups/message_box/message_box.js";

import 
{ 
    load_finish 
}
from "../lazy_loading/lazy_loading.js";

import
{
    add_car_view ,
}
from "./pop_ups/car_adder.js"
import 
{ 
    CARSTATUS 
} 
from "../states/car_status.js";

import 
{ 
    clear_cars         ,
    insert_car_to_list ,
} 
from "./car_list.js";


let uid             , 
    add_new_car_btn ,
    parked_cars     ;

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
            insert_new_car(uid,data)
            .then(() => {
                message_box(
                    "A new car was added!",
                    (popup) => {
                        popup.remove();
                    }
                );
            });
            e.remove();
        }
    );
});


async function load_content () {

    parked_cars = await get_car_by_status(uid,CARSTATUS.PARKED);
    
    if(parked_cars.length > 0) {

        try {
            // hide only ampty activity
            $("#empty-car")
            .css("display", "none");
        }catch(err){}
        
        clear_cars();

        let size = parked_cars.length;
        for (let idx = 0; idx < size;idx++) {
            
            insert_car_to_list(
                parked_cars[idx]
            );
        }
    }

    load_finish();
}

on_car_update(uid,() => {
    
    load_content();
});


