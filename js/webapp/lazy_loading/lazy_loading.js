/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";


export function show_loading() {
    let lazy_loading = document.createElement("div");
    lazy_loading.id  = "lazy-loading-overlay";
    lazy_loading.classList.add("lazy-loading");
    lazy_loading.innerHTML = 
    `
        <div class="blur-bg"></div>
        <div class="blur-fg">
            <img class="loading-icon" src="../../assets/webapp/car-running.gif" alt="loading-gif">
            <span class="loading-label" role="text">loading...</span>
        </div>
    `;
    $("body").prepend(lazy_loading);
}


export function load_finish () {
    let ll = $("#lazy-loading-overlay");
    try {
        ll.remove();
    }
    catch($err) {
        console.log("already loaded!");
    }
}


