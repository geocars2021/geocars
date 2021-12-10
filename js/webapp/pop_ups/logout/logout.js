import "../../../jquery/jquery-3.6.0.min.js";

/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/

export function logout(message,onPositive,onNegaive) {
    let logout_overlay = document.createElement("div");
    logout_overlay.classList.add("logout-overlay");
    logout_overlay.innerHTML = 
    "\t<div class=\"logout\"> \n" +
    "\t\t <div class=\"message-wrapper\"> \n"+
    `\t\t\t <span class=\"message\" role=\"text\">${message}</span> \n` +
    "\t\t </div> \n"+
    "\t\t <div class=\"btn-wrapper\"> \n"+
    "\t\t\t <button id=\"log-positive\" class=\"btn\"> Ok </button> \n"+
    "\t\t\t <button id=\"log-negative\" class=\"btn\"> Cancel </button> \n"+
    "\t\t </div> \n" +
    "\t </div> \n";

    $("body").prepend(logout_overlay);
    
    $("#log-positive").click((e) => {
        onPositive(logout_overlay);
    });

    $("#log-negative").click((e) => {
        onNegaive(logout_overlay);
    });
}


// old code
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

