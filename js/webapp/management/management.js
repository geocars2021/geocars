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
    get_car_by_plate_no,
    get_car_by_status,
    get_car_images_by_car_id,
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


let uid;


uid = get_login_cred();

const management = ({
    search_bar: null,
    add_new_car_btn: null,
    loaded_cars : [],
    onload: function() {
        this.add_search_event();

        this.add_new_car_event();

        on_car_update(uid , () => {
            this.save_content();
            load_finish();
        });
    },
    add_search_event : function () {
        // filter content
        this.search_bar = $("#input-search");
        this.search_res = $("#search-result");
        this.search_bar.keyup(async (key) => {
            
            for (let idx = 0; idx < this.loaded_cars.length;idx++) {
                const car_obj = this.loaded_cars[idx];
                if (car_obj.car.data.plateno == this.search_bar.val()) {
                    clear_cars();
                    insert_car_to_list(
                        car_obj.car    ,
                        car_obj.photos ,
                    );
                    break;
                } 
                else{
                    this.load_content();
                }
            }
        });
    },
    add_new_car_event: function () {
        // add car
        this.add_new_car_btn = $("#add-new-car");
        this.add_new_car_btn.click(() => {
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
    },
    save_content: async function() {
        let parked_cars = await get_car_by_status(
            uid,
            CARSTATUS.PARKED
        );
    
        if(parked_cars.length > 0) {

            let size = parked_cars.length;
            
            this.loaded_cars = [];

            for (let idx = 0; idx < size;idx++) {
                let photos = await get_car_images_by_car_id(
                    parked_cars[idx].id
                );
                this.loaded_cars.push({
                    photos : photos,
                    car    : parked_cars[idx]
                });
                this.load_content();
            }
            this.load_content();
        }
    },
    load_content : function() {
        if(this.loaded_cars.length > 0) {
            try {
                // hide only ampty activity
                $("#empty-car")
                .css("display", "none");
            }catch(err){}
            
            clear_cars();
 
            let size = this.loaded_cars.length;
            
            for (let idx = 0; idx < size;idx++) {
                insert_car_to_list(
                    this.loaded_cars[idx].car    ,
                    this.loaded_cars[idx].photos ,
                );
            }
        }
        else {
            $("#empty-car")
            .css("display", "flex");
            clear_cars();
        }
    }
});

management.onload();