/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";


function new_row(date_time,description) {
    let row = document.createElement("span");
    row.classList.add("table-row");
    row.innerHTML = 
    `\t <span class="table-row-data date-time-value" role="text">${date_time}</span> \n` +
    `\t <span class="table-row-data description-value">${description}</span> \n`+
    "\t <button class=\"delete-activity fa fa-trash\"></button>";
    return row;
}


export function insert_activity(date_time,description) {

    let activity_list = $("#activity-list");

    activity_list.append(
        new_row(date_time,description)
    );
    
}


console.log(new_row("asdasd","asdsad"));