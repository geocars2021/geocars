/* re import jquery always!! */
import "../../jquery/jquery-3.6.0.min.js";
import "../../jquery/jquery-cookie-1.4.1.min.js";
import "../sidebar/sidebar.js";
import 
{ 
    load_finish 
} 
from "../lazy_loading/lazy_loading.js";

import 
{ 
    myChart0 ,
    myChart1 , 
    myChart2 ,
} 
from "./charts.js";

import 
{ 
    OnlineUser 
} 
from "./OnlineUser.js";



/** 
 * just use set interval instead of ajax 
 * | update every 6 seconds
 * 
 * **/

setInterval(async (e) => {
    
} , 6000);

load_finish();


