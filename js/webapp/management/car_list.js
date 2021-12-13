/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";



function add_carTile(carID,carBrand,carModel,carPlate,carPhotoUrl) {
    let car_info_wrapper = document.createElement("div");
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
            <button class="control-btn update-car-info">
                <i class="btn-icon fa fa-edit"></i>
                <span class="btn-label">Update</span>
            </button>
            <!-- on delete -->
            <button class="control-btn delete-car-info">
                <i class="btn-icon fa fa-trash"></i>
                <span class="btn-label">Update</span>
            </button>
        </div>
    </div>
    `;
    return car_info_wrapper;
}

let car_list;

car_list = $("#car-list");

car_list.append(
    add_carTile(
        "asdasdasd",
        "Toyota",
        "Vios",
        "69420",
        "https://image.shutterstock.com/image-illustration/small-yellow-compact-car-260nw-394558741.jpg"
    )
)
