

/**
 * Ge inani ra naku kay kapoy cgeg
 * createElement2x
 * **/

function logout(message,onPositive,onNegaive) {
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

    document.getElementsByTagName("body")[0].appendChild(logout);
    document.getElementById("log-positive").onclick = (e) => {
        onPositive(logout);
    };
    document.getElementById("log-negative").onclick = (e) => {
        onNegaive(logout);
    };
}


