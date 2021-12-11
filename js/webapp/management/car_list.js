/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";



function add_carTile(carID,carType,carPhotoUrl) {
    let car_info_wrapper = document.createElement("div");
    car_info_wrapper.classList.add("car-info-wrapper");
    car_info_wrapper.innerHTML =
    "\t <div class=\"car-info-content\"> \n" +
    `\t\t <div class="car-featured-photo" style="background-image: url('${carPhotoUrl}');"></div> \n` +
    "\t\t <div class=\"car-info-group\"> \n" +
    "\t\t\t <div class=\"car-type-group\"> \n" +
    "\t\t\t\t <span class=\"type-label\" role=\"text\">Type:</span> \n" +
    `\t\t\t\t <span class=\"type-value\">${carType}</span> \n` +
    "\t\t\t </div> \n" +
    "\t\t\t <div class=\"car-event-btn-wrapper\"> \n" +
    "\t\t\t\t <button class=\"event-btn update-car-info-btn\"> \n" +
    "\t\t\t\t\t <i class=\"event-btn-icon fa fa-edit\"></i> \n" +
    "\t\t\t\t\t <span class=\"event-btn-label\">Update</span> \n" +
    "\t\t\t\t </button> \n" +
    "\t\t\t\t <span class=\"btn-separator\"></span>" +
    "\t\t\t\t <button class=\"event-btn delete-car-btn\"> \n " +
    "\t\t\t\t\t <i class=\"event-btn-icon fa fa-trash\"></i> \n" +
    "\t\t\t\t\t <span class=\"event-btn-label\">Delete</span> \n" +
    "\t\t\t\t </button>" +
    "\t\t\t </div> \n" +
    "\t\t </div> \n" +
    "\t </div> \n";
    return car_info_wrapper;
}

let car_list = $("#car-list");

// car_list.append(
//     add_carTile(
//         "asdasd" ,
//         "Fuckof" ,
//         "https://highpng.com/wp-content/uploads/2021/05/toyota-red-camry-car-free-png-images-free-download-png-images-from-highpng-png-images-vector-illustration-.png"
//     )
// );



