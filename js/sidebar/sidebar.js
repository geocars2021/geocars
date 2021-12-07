


class SideBar {
    constructor(){
        try{
            this.sideBar = document.querySelector(".sidebar");
            this.defaultStyle = this.sideBar.style;
            this.onLoad();
            this.onResize();
        }catch(err){
            console.error(err);
        }
    }
    sizeWidth(){
        return this.sideBar.offsetWidth;
    }
    onLoad(){
        if(this.sideBar != null)
            if(window.innerWidth > 1 && window.innerWidth <= 768)
                // hide if medium screen view
                this.sideBar.style.left = `-${this.sideBar.offsetWidth}px`;
    }
    onResize(){
        window.addEventListener("resize",(e)=>{
            if(this.sideBar != null)
                if(window.innerWidth > 1 && window.innerWidth <= 768)
                    this.sideBar.style.left = `-${this.sideBar.offsetWidth}px`;
                else
                    this.sideBar.style = this.defaultStyle;
        });
    }
    untoggle(offset) {
        this.sideBar.classList.remove("toggle");
        this.sideBar.classList.add("untoggle");
        // this.sideBar.style.left = `0`;
        this.sideBar.style.left = `${offset}px`;
    }
    toggle(offset) {
        this.sideBar.classList.remove("untoggle");
        this.sideBar.classList.add("toggle");
        // this.sideBar.style.left = `-${this.sideBar.offsetWidth}px`;
        this.sideBar.style.left = `-${offset}px`;
    }
}


// initialize
/*
var sidebar = new SideBar();
var istrigg = false;
var xSwipe  = null;
var ySwipe  = null;

document.addEventListener('touchstart', function(event) {
    
    xSwipe = event.touches[0].clientX;
    ySwipe = event.touches[0].clientY;
    // swiping must start at the left corner only!
    if(xSwipe >= 0 && xSwipe <= 30)
        istrigg = true;
    else
        istrigg = false;
});

document.addEventListener('touchmove', function(event) {
    if(!istrigg)
        return;
    if(!xSwipe || !ySwipe)
        return;
    
    let ifxswipe = event.touches[0].clientX;
    let ifyswipe = event.touches[0].clientY;
    let xdiff = xSwipe - ifxswipe;
    let ydiff = xSwipe - ifyswipe;
    if (Math.abs(xdiff) > Math.abs(ydiff)) {
        if ( xdiff > 0 ) {
            console.log(`Toggle ${ifxswipe}`);
        } else {
            console.log(`Untoggle ${ifxswipe}`);
        }    
    }
});


document.addEventListener('touchend', function(event) {
    istrigg = false;
    xSwipe  = null;
    ySwipe  = null;
});

*/
