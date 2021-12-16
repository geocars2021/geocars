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
    delete_car,
    get_car_by_status,
    get_car_images_by_car_id,
    insert_new_car,
    on_car_update,
    update_car,
}
from "../connection_handler/connection.js";

import
{
    message_box
}
from "../pop_ups/message_box/message_box.js";

import 
{ 
    load_finish, show_loading 
}
from "../lazy_loading/lazy_loading.js";

import
{
    add_car_view ,
}
from "./pop_ups/car_adder.js";

import
{
    qr_viewer ,
}
from "./pop_ups/qr_viewer.js";

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

import 
{ 
    update_car_view 
} 
from "./pop_ups/car_update.js";

import 
{ 
    dialogbox 
} 
from "../pop_ups/dialogbox/dialogbox.js";

let uid;
let LOADED_CARS;
let ADD_NEW;
let SEARCH_BAR;
let SEARCH_BTN;


uid = get_login_cred();
ADD_NEW = $("#add-new-car");
ADD_NEW.click(function addCar(){
    add_car_view(
        uid ,
        function on_cancel (addcar_view) {
            addcar_view.remove();
        },
        function on_addcar (addcar_view,data) {
            show_loading();
            insert_new_car(uid,data)
            .then(() => {
                addcar_view.remove();
                load_finish();
                message_box(
                    "Car successfully added!" ,
                    (message) => {
                        message.remove();
                    }
                );
            });
        }
    );
});

SEARCH_BAR = $("#input-search");
SEARCH_BAR.keyup(function onSearch () {
    onSearchQuery();
});

SEARCH_BTN = $("#search-btn");
SEARCH_BTN.click(function onClickSearch () {
    onSearchQuery();
});


on_car_update(uid,async function(){
    LOADED_CARS = [];
    clear_cars();
    fetchParkedPars()
    .then(() => load_finish());
});




async function onSearchQuery() {
    const plate = SEARCH_BAR.val();
    let idx , matched = false;
    for (idx = 0;idx < LOADED_CARS.length;idx++) {
        const car = LOADED_CARS[idx];
        console.log(`${car.car.data.plateno} == ${plate}`)
        if(car.car.data.plateno == plate) {
            matched = true;
            clear_cars(false);
            insert_car_to_list(
                car.car    , 
                car.photos ,
                (e) => on_qr_view(car)      ,   
                (e) => on_update_btn(e,car) ,
                (e) => on_delete_btn(e,car) ,
            );
            break;
        }
        else {
            drawParkedCars();
        }
    }
}


async function fetchParkedPars() {
    let p = await get_car_by_status(
        uid,
        CARSTATUS.PARKED
    );

    if(p.length > 0) {

        LOADED_CARS = [];

        let idx;
        for (idx = 0;idx < p.length;idx++) {
            LOADED_CARS.push({
                photos : await 
                get_car_images_by_car_id(
                    p[idx].id
                ),
                car : p[idx]
            });
        }

        drawParkedCars(); 

    }   
}

async function drawParkedCars() {

    if(LOADED_CARS.length > 0) {
       
        clear_cars(false);

        let idx;
        for (idx = 0;idx < LOADED_CARS.length;idx++) {
            let car = LOADED_CARS[idx];
            insert_car_to_list(
                car.car    , 
                car.photos ,
                (e) => on_qr_view(car)      ,   
                (e) => on_update_btn(e,car) ,
                (e) => on_delete_btn(e,car) ,
            );
        }
    }
    else {
        clear_cars();
    }
}

async function on_qr_view (car) {
    qr_viewer(
        car.car.data.owner ,
        car.car.id         ,
        function on_close(qr_view) {
            qr_view.remove();
        }
    );
}

async function on_update_btn (update_btn,car) {
    update_car_view(
        uid        ,
        car.car.id ,
        function on_close(update_car_view) {
            update_car_view.remove();
        },
        function on_update(update_car_view,data) {
            show_loading();
            update_car(uid,car.car.id,data)
            .then(() => {
                update_car_view.remove();
                load_finish();
                message_box(
                    "Car successfully updated!" ,
                    (message) => {
                        message.remove();
                    }
                );
            });
        }
    );
    update_btn.stopPropagation();
}

async function on_delete_btn (delete_btn,car) {

    dialogbox(
        "Confirm car deletion?" ,
        (dialog) => {
            show_loading();
            delete_car(car.car.id)
            .then(() => {
                load_finish();
                dialog.remove();
            });
        },
        (dialog) => {
            dialog.remove();
        }
    );

    delete_btn.stopPropagation();
}