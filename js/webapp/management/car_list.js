/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";



function add_carTile(carID,carBrand,carModel,carPlate,carPhotoUrl,on_update,on_delete) {
    let car_info_wrapper = document.createElement("div");
    car_info_wrapper.id = carID;
    car_info_wrapper.classList.add("car-info-wrapper");
    car_info_wrapper.innerHTML =
    `
    <div class="car-info-content">
        <div class="car-brand-model-group"> 

            <div class="label-info-group">
                <span class="label-icon-group" role="text">
                    <i class="label-icon fa fa-car"></i>
                    <span class="label-model" role="text">Model</span>
                </span>
                <span class="info-value car-model" role="text">${carModel}</span>
            </div>

            <div class="label-info-group">
                <span class="label-icon-group" role="text">
                    <i class="label-icon fa fa-car"></i>
                    <span class="label-model" role="text">Brand</span>
                </span>
                <span class="info-value car-brand" role="text">${carBrand}</span>
            </div>

        </div>

        <div class="plate-num-group">
            <span class="plate-num-ripple"></span>
            <span class="plate-num-value" role="text">${carPlate}</span>
        </div>

        <div class="car-featured-photo" style="background-image: url('${carPhotoUrl}');"></div>
       

        <div class="event-button-group">
            <!-- on update -->
            <button id="${carID}-upd" class="control-btn update-car-info">
                <i class="btn-icon fa fa-edit"></i>
                <span class="btn-label">Update</span>
            </button>
            <!-- on delete -->
            <button id="${carID}-del" class="control-btn delete-car-info">
                <i class="btn-icon fa fa-trash"></i>
                <span class="btn-label">Delete</span>
            </button>
        </div>
    </div>
    `;
    return car_info_wrapper;
}

export function clear_cars () {
    let car_list = $("#car-list");
    let children = car_list.children();
    // remove second element until last only;
    for (let idx = 1;idx < children.length;idx++){
        children[idx].remove();
    }
}

export async function insert_car_to_list (car_data,photos,on_click,on_update,on_delete) {
    let car_list = $("#car-list");
    let car_view = add_carTile(
        car_data.id           ,
        car_data.data.brand   ,
        car_data.data.model   ,
        car_data.data.plateno ,
        photos[0],
    )
    car_list.append(
        car_view
    );
    $(`#${car_data.id}`).click((e) => on_click(e));
    $(`#${car_data.id}-upd`).click((e) => on_update(e));
    $(`#${car_data.id}-del`).click((e) => on_delete(e));
}

