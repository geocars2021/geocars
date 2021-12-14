/* re import jquery always!! */
import "../../../jquery/jquery-3.6.0.min.js";
import "../../../jquery/jquery-cookie-1.4.1.min.js";


import
{
    get_car_brands ,
    get_car_models, 
    get_car_by_plate_no,
}   
from "../../connection_handler/connection.js";

import
{
    CARSTATUS
}
from "../../states/car_status.js";

/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/

export async function add_car_view (uid,on_cancel_callback , on_add_callback) {

    let cancel_btn , 
        add_btn    
        ;

    let add_car = document.createElement("div");
    add_car.classList.add("add-car-view-overlay");
    add_car.innerHTML = 
    `
        <div class="add-car-view">
            <div class="cancel-addition-group">
                <button id="on-addition-canceled" class="cancel-btn fa fa-close"></button>
                <span class="cancel-adition-title" role="text">Add a new car</span>
            </div>

            <div class="labeled-input-group car-brand-group">
                <span class="input-label car-brand-label" role="text">Car Brand</span>
                <input id="car-brand-input" class="input-input brand-input" list="brands-list" type="list" name="brand-list" placeholder="input or select brand">
                <datalist id="brands-list"></datalist>
                <span id="validate-brand" class="input-validator"></span>
            </div>

            <div class="labeled-input-group">
                <span class="input-label" role="text">Car Model</span>
                <input id="car-model-input" class="input-input" list="models-list" type="list" name="model-list" placeholder="input or select model">
                <datalist id="models-list"></datalist>
                <span id="validate-model" class="input-validator"></span>
            </div>

            <div class="labeled-input-group">
                <span class="input-label" role="text">Plate number</span>
                <input id="car-plate-input" class="input-input" type="text" name="plate-number" placeholder="plate number">
                <span id="validate-plate-number" class="input-validator"></span>
            </div>

            <div class="labeled-input-group">
                <span class="input-label" role="text">Rate</span>
                <input id="car-rate-input" class="input-input" type="number" name="rate" placeholder="&#x20B1; RATE / day">
                <span id="validate-rate" class="input-validator"></span>
            </div>

            <div class="attach-image-group">
                <label class="custom-file-input" for="car-images-input">
                    <i class="add-image-icon fa fa-image"></i>
                </label>
                <input id="car-images-input" type="file" accept="image/jpeg" multiple style="display:none;">
                <span id="validate-images" class="image-validator"></span>
            </div>

            <button id="add-car" class="btn-add">
                <i class="btn-add-icon fa fa-plus"></i>
                <span class="btn-add-label" role="text">Add car</span>
            </button>
        </div>
    `;

    $("body").prepend(add_car);

    on_screen_change();

    $(window).resize(() => on_screen_change());

    cancel_btn = $("#on-addition-canceled");
    cancel_btn.click(() => {

        if(on_cancel_callback)
            on_cancel_callback(add_car);

    });

    // add brand drop down
    get_car_brands(uid).then((brands) => {
        brands.forEach((brand) => {
            const b_option = document.createElement("option");
            b_option.value = brand;
            $("#brands-list").append(b_option);
        });
    });
    
    // add model drop down
    get_car_models(uid).then((models) => {
        models.forEach((model) => {
            const m_option = document.createElement("option");
            m_option.value = model;
            $("#models-list").append(m_option);
        });
    });

    // content
    let c_brand , 
        c_model ,
        c_plate ,
        c_rate  ,
        c_imgs  ;
    
    // brand
    c_brand = $("#car-brand-input");
    // model
    c_model = $("#car-model-input");
    // plate number
    c_plate = $("#car-plate-input");
    // rate
    c_rate  = $("#car-rate-input");
    // images
    let images = [];
    c_imgs = document.getElementById("car-images-input");
    c_imgs.onchange = () => {
        images = c_imgs.files;
    };
    let disabled = false;

    add_btn = $("#add-car");
    add_btn.click(async () => {
        let car;
        
        if(disabled)
            return;

        if(validate_car_adder())
            return;

        car = await get_car_by_plate_no(uid,c_plate.val());

        if(car) 
            return on_car_exist();
        
        disabled = true;

        if(on_add_callback)
            on_add_callback(
                add_car ,
                {   
                    brand  : c_brand.val() ,
                    model  : c_model.val() ,
                    plate  : c_plate.val() ,
                    rate   : c_rate.val()  ,
                    files  : images        ,
                    status : CARSTATUS.PARKED ,
                }
            );
    });
}

function on_screen_change () {
    const w = window.innerWidth;
    if (w <= 768) {
        $("#on-addition-canceled")
        .removeClass("fa-close")
        .addClass("fa-arrow-left");
    }
    else {
        $("#on-addition-canceled")
        .removeClass("fa-arrow-left")
        .addClass("fa-close");
    }
}


function validate_car_adder () {
    let has_invalid = false;
    if ($("#car-brand-input").val().length <= 0) {
        $("#validate-brand")
        .text("*Car brand is required!");
        has_invalid = true;
    }
    else {
        $("#validate-brand")
        .text("");
    }
    if ($("#car-model-input").val().length <= 0) {
        $("#validate-model")
        .text("*Car model is required!");
        has_invalid = true;
    }
    else {
        $("#validate-model")
        .text("");
    }
    if ($("#car-plate-input").val().length <= 0) {
        $("#validate-plate-number")
        .text("*Plate number is required!");
        has_invalid = true;
    }
    else {
        $("#validate-plate-number")
        .text("");
    }
    if ($("#car-rate-input").val().length <= 0) {
        $("#validate-rate")
        .text("*Per day rate is required!");
        has_invalid = true;
    }
    else {
        $("#validate-rate")
        .text("");
    }
    let filelen = document.getElementById("car-images-input").files.length;
    if (filelen < 5) {
        $("#validate-images")
        .text(`*Please attach 5 image. ${filelen}/5`);
        has_invalid = true;
    }
    else {
        $("#validate-images")
        .text("");
    }
    return has_invalid;
}

function on_car_exist () {
    $("#validate-plate-number")
    .text("*Car already existed!");
}


