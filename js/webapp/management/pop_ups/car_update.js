/* re import jquery always!! */
import "../../../jquery/jquery-3.6.0.min.js";
import "../../../jquery/jquery-cookie-1.4.1.min.js";
import
{
    get_car_brands ,
    get_car_by_id,
    get_car_models, 
}   
from "../../connection_handler/connection.js";

/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/

export async function update_car_view (uid,carid,on_cancel_callback,on_update_callback) {
    let cancel_btn , 
    update_btn     ;

    let updater_overlay = document.createElement("div");
    updater_overlay.classList.add("updater-overlay");
    updater_overlay.innerHTML = 
    `
        <div class="update-car-view">
            <div class="cancel-update-group">
                <button id="on-update-canceled" class="cancel-btn fa fa-close"></button>
                <span class="cancel-update-title" role="text">Update car</span>
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

            <button id="update-car" class="btn-update">
                <i class="btn-update-icon fa fa-plus"></i>
                <span class="btn-update-label" role="text">Update car</span>
            </button>
        </div>
    `;

    $("body").prepend(updater_overlay);

    on_screen_change();

    $(window).resize(() => on_screen_change());

    cancel_btn = $("#on-update-canceled");
    cancel_btn.click(() => {

        if(on_cancel_callback)
            on_cancel_callback(updater_overlay);

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
    let car = await get_car_by_id(carid);
    // content
    let c_brand , 
        c_model ,
        c_plate ,
        c_rate  ,
        c_imgs  ;
    
    // brand
    c_brand = $("#car-brand-input");
    c_brand.val(car.data.brand);
    // model
    c_model = $("#car-model-input");
    c_model.val(car.data.model)
    // plate number
    c_plate = $("#car-plate-input");
    c_plate.val(car.data.plateno)
    .prop("disabled", true);
    // rate
    c_rate  = $("#car-rate-input");
    c_rate.val(car.data.rate);
    // images
    let images = [];
    c_imgs = document.getElementById("car-images-input");
    c_imgs.onchange = () => {
        images = c_imgs.files;
    };
    let disabled = false;

    update_btn = $("#update-car");
    update_btn.click(async () => {
        let car;
        
        if(disabled)
            return;

        if(validate_car_adder())
            return;

        
        disabled = true;

        if(on_update_callback)
            on_update_callback(
                updater_overlay ,
                {   
                    brand  : c_brand.val() ,
                    model  : c_model.val() ,
                    plate  : c_plate.val() ,
                    rate   : c_rate.val()  ,
                    files  : images        ,
                }
            );
    });

}


function on_screen_change () {
    const w = window.innerWidth;
    if (w <= 768) {
        $("#on-update-canceled")
        .removeClass("fa-close")
        .addClass("fa-arrow-left");
    }
    else {
        $("#on-update-canceled")
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
    if (filelen > 0 && filelen < 5) {
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