import "../../../jquery/jquery-3.6.0.min.js";

/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/

export function message_box(message,onPositive) {
    let mbox_overlay = document.createElement("div");
    mbox_overlay.classList.add("mbox-overlay");
    mbox_overlay.innerHTML = 
    `
    <div class="mbox">
        <div class="message-wrapper">
            <span class="message" role="text">${message}</span> 
        </div>
        <div class="btn-wrapper">
            <button id="btn-positive" class="btn"> Ok </button>
        </div> 
    </div>
    `;

    $("body").prepend(mbox_overlay);

    $("#btn-positive").click((e) => {
        onPositive(mbox_overlay);
    });
}

/*
<div class="mbox">
    <div class="message-wrapper">
        <span class="message" role="text">${message}</span> 
    </div>
    <div class="btn-wrapper">
        <button id="btn-positive" class="btn"> Ok </button>
    </div> 
</div>
*/



// old code v2
/*
    "\t <div class=\"mbox\"> \n" +
    "\t\t <div class=\"message-wrapper\"> \n"+
    `\t\t\t <span class=\"message\" role=\"text\">${message}</span> \n` +
    "\t\t </div> \n"+
    "\t\t <div class=\"btn-wrapper\"> \n"+
    "\t\t\t <button id=\"btn-positive\" class=\"btn\"> Ok </button> \n"+
    "\t\t </div> \n" +
    "\t </div> \n";
*/

// old code v1
/*
    mbox.classList.add("mbox");
    mbox.innerHTML = 
    "\t <div class=\"message-wrapper\"> \n"+
        `\t\t <span class=\"message\" role=\"text\">${message}</span> \n` +
    "\t </div> \n"+
    "\t <div class=\"btn-wrapper\"> \n"+
        "\t\t <button id=\"btn-positive\" class=\"btn\"> Ok </button> \n"+
    "\t </div> \n";

    $("body").append(mbox);

    $("#btn-positive").click((e) => {
        onPositive(mbox);
    });

*/

