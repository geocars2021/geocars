


class OnlineUser {
    constructor (id,name_abbr,name,data_percentage) {
        /* 
            Kapoy cgeg createElement 
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
            YAWA
        */
        this.list_data = document.createElement("div")
        this.list_data.classList.add("list-data");
        this.list_data.innerHTML = 
        "<div class=\"data-wrapper\"> \n" +
            
            "<div class=\"lite-info-container\"> \n" +
                "<div class=\"subs-avatar-round\"> \n" +
                    "<div class=\"subs-abbr-wrapper\"> \n" +
                        `<span id="subs-abbr-${id}" class="subs-abbr" role="text">${name_abbr}</span> \n` +
                    "</div> \n" +
                "</div> \n" +
                `<span id="subs-name-${id}" class="subs-name" role="text">${name}</span> \n` +
            "</div> \n" +
            "<div class=\"usage-info-container\"> \n" +
                "<span class=\"usage-label\" role=\"text\">Usage</span> \n" +
                "<span class=\"progressbar\" role=\"cell\"> \n" +
                    `<span class="value" style="width: ${data_percentage}%;" role="cell"></span> \n` +
                "</span> \n" +
                `<span class="value-percentage" role="text">${data_percentage}%</span> \n` +
            "</div> \n" +
           
        "</div> \n";
    }

    asHtml() {
        return this.list_data;
    }
}



