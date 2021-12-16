/* re import jquery always!! */
import "../../../jquery/jquery-3.6.0.min.js";
import "../../../jquery/jquery-cookie-1.4.1.min.js";

import
{
    QRCode
}
from "../../tool/qrcode_gen/qrcode.js";



/**
 * Ge inani ra naku kay 
 * aron dili ma flooded ug 
 * function call ang JS virtual machine
 * **/

export async function qr_viewer (uid,carid,on_close_callback) {
    let qr_view_overlay = document.createElement("div");
    qr_view_overlay.classList.add("qr-view-overlay");
    qr_view_overlay.innerHTML = 
    `
        <div class="qr-view">
            <div class="qr-close-group">
                <button id="qr-close-btn" class="close-qr-btn fa fa-close"></button>
                <span class="qr-view-title" role="text">QR Code View</span>
            </div>
            <div class="qr-code-wrapper">
                <div id="qr-code" class="qr-code-graphics"></div>
            </div>
            <span class="qr-code-label" role="text">Scan code to bind</span>
        </div>
    `;

    function generate () {
        const qr = $("#qr-code");
        qr.empty();
        try {
            new QRCode(
                "qr-code", 
                {
                    text   : `{ "ownerid" : "${uid}" , "carid" : "${carid}" }`,
                    width  : qr.width() - 15,
                    height : qr.width() - 15,
                    correctLevel : QRCode.CorrectLevel.H
                }
            );
        }
        catch(err) {}
    }

    $("body").prepend(qr_view_overlay);

    $("#qr-close-btn").click(() => {
        if(on_close_callback)
            on_close_callback(qr_view_overlay);
    });

    on_screen_change();

    generate();

    $(window).resize(() => {
        on_screen_change();
        generate();
    });
    
}

function on_screen_change () {
    const w = window.innerWidth;
    if (w <= 768) {
        $("#qr-close-btn")
        .removeClass("fa-close")
        .addClass("fa-arrow-left");
    }
    else {
        $("#qr-close-btn")
        .removeClass("fa-arrow-left")
        .addClass("fa-close");
    }
}

