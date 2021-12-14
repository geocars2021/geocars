/* re import jquery always!! */
import "../../../jquery/jquery-3.6.0.min.js";
import "../../../jquery/jquery-cookie-1.4.1.min.js";
import
{
    QRCode
}
from "../../tool/qrcode_gen/qrcode.js";


export async function qr_viewer (uid,carid) {
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

        new QRCode(
            "qr-code", 
            {
                text   : `{owner: ${uid},carid: ${carid}}`,
                width  : qr.width() - 15,
                height : qr.width() - 15,
                correctLevel : QRCode.CorrectLevel.H
            }
        );
    }

    $("body").prepend(qr_view_overlay);


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
        $("#on-addition-canceled")
        .removeClass("fa-close")
        .addClass("fa-arrow-left");
    }
    else {
        $("#on-addition-canceled")
        .removeClass("fa-arrow-left")
        .addClass("fa-close");
    }
}

