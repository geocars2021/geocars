

export function get_date_now () {
    let d_now = new Date();
    let mm , dd , yy
    mm = d_now.getMonth();
    dd = d_now.getDay();
    yy = d_now.getFullYear();
    return `${mm}-${dd}-${yy}`;
}


