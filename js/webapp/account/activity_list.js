/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";

/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/



function new_row(date_time,description) {
    let row = document.createElement("span");
    row.classList.add("table-row");
    row.innerHTML = 
    `\t <span class="table-row-data date-time-value" role="text">${date_time}</span> \n` +
    `\t <span class="table-row-data description-value">${description}</span> \n`+
    "\t <button class=\"delete-activity fa fa-trash\"></button>";
    return row;
}



export function clear_list () {
    let activity_list = $("#activity-list");
    let children = activity_list.children();
    // remove second element until last only;
    for (let idx = 1;idx < children.length;idx++){
        children[idx].remove();
    }
}

export function mark_as_empty () {
    
}

export function insert_activity(date_time,description) {
    let activity_list = $("#activity-list");
    activity_list.append(
        new_row(date_time,description)
    );
    
}
