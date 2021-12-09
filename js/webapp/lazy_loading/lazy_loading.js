


export function load_finish () {
    let ll = document.getElementById("lazy-loading-overlay");
    try {
        ll.remove();
    }
    catch($err) {
        console.log("already loaded!");
    }
}


