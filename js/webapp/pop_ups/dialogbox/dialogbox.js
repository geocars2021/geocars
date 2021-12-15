/* re import jquery always!! */
import "../../../jquery/jquery-3.6.0.min.js";
import "../../../jquery/jquery-cookie-1.4.1.min.js";


/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/

export function dialogbox (message,onPositive,onNegaive) {
    let dialogbox_overlay = document.createElement("div");
    dialogbox_overlay.classList.add("dialogbox-overlay");
    dialogbox_overlay.innerHTML = 
    `
        <div class="dialogbox">
            <div class="message-wrapper">
                <span class="message" role="text">${message}</span>
            </div>
            <div class="btn-wrapper">
                <button id="log-positive" class="btn"> Ok </button>
                <button id="log-negative" class="btn"> Cancel </button>
            </div>
        </div>
    `;

    $("body").prepend(dialogbox_overlay);
    
    $("#log-positive").click((e) => {
        onPositive(dialogbox_overlay);
    });

    $("#log-negative").click((e) => {
        onNegaive(dialogbox_overlay);
    });
}



// old code v2
/*
    "\t<div class=\"logout\"> \n" +
    "\t\t <div class=\"message-wrapper\"> \n"+
    `\t\t\t <span class=\"message\" role=\"text\">${message}</span> \n` +
    "\t\t </div> \n"+
    "\t\t <div class=\"btn-wrapper\"> \n"+
    "\t\t\t <button id=\"log-positive\" class=\"btn\"> Ok </button> \n"+
    "\t\t\t <button id=\"log-negative\" class=\"btn\"> Cancel </button> \n"+
    "\t\t </div> \n" +
    "\t </div> \n";
*/

// old code v1
/*
    let logout = document.createElement("div");
    logout.classList.add("logout");
    logout.innerHTML = 
    "\t <div class=\"message-wrapper\"> \n"+
        `\t\t<span class=\"message\" role=\"text\">${message}</span> \n` +
    "\t </div> \n"+
    "\t <div class=\"btn-wrapper\"> \n"+
        "\t\t <button id=\"log-positive\" class=\"btn\"> Ok </button> \n"+
        "\t\t <button id=\"log-negative\" class=\"btn\"> Cancel </button> \n"+
    "\t </div> \n";

    $("body").append(logout);

    $("#log-positive").click((e) => {
        onPositive(logout);
    });

    $("#log-negative").click((e) => {
        onNegaive(logout);
    });
*/

