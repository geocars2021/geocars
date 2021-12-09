

// Import the functions you need from the SDKs you need
import 
{ 
    initializeApp 
}
from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";

import 
{ 
    getStorage     , 
    ref            , 
    getDownloadURL , 
}
from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";

import 
{ 
    getFirestore , 
    collection   ,
    addDoc       ,
    getDocs      ,
    getDoc       ,
    setDoc       ,
    doc          ,
    query        ,
    where        ,
    onSnapshot   ,
}
from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js"

import
{ 
    validate_connection 
}
from "../pop_ups/connection_error/connection_error.js"

import
{ 
    get_date_now 
} 
from "../tool/custom_date.js";

// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
    apiKey            : "AIzaSyDOk5ITVxhiW4yYJok7jnzsfWnXWuxwh-Y",
    authDomain        : "geocars2021.firebaseapp.com",
    projectId         : "geocars2021",
    storageBucket     : "geocars2021.appspot.com",
    messagingSenderId : "67620653500",
    appId             : "1:67620653500:web:7e35fec38cd355276fc3b9",
    measurementId     : "G-9YC2H8ZXLT"
};

// Initialize Firebase

export var APP;
export var FIRESTORE_DB;

try {
    // prevents re-initialization
    APP = initializeApp(firebaseConfig);
    FIRESTORE_DB = getFirestore();
}
catch ($err) {
    console.log($err);
}


/* on update in current loggedin company */
export async function on_update (uid,callback) {
    validate_connection();
    let company = collection(
        FIRESTORE_DB ,
        "company"
    );

    let comp_data = onSnapshot(doc(company,uid),((doc) => {
        callback(doc.data());
    }));
}

/* save new company */
export async function save_new_company (email,name,salt,passkey) {
    validate_connection();
    
    let company = collection(
        FIRESTORE_DB ,
        "company"
    );
    
    let docRef = await addDoc(company,{
        email   : email ,
        name    : name  ,
        salt    : salt  ,
        passkey : passkey    ,
        plan    : "FREEMIUM" , // set FREEMIUM as default plan,
        contact : "N/A"      , // set contact num as N/A
        address : "N/A"      , // set address as N/A
    });
    
    await insert_activity(
        docRef.id,
        `${name} joined geocars.`
    )
}

/* inserts activity to current loggedin company */ 
export async function insert_activity (uid,description) {
    validate_connection();

    let company , snapshot;

    company = collection(
        FIRESTORE_DB ,
        "company"
    );

    snapshot = await get_data_by_id(uid);
    if (snapshot) {
        
        const newcomp = doc(company, uid );
        await setDoc(newcomp, {
            activities : [
                {
                    date : get_date_now(),
                    description : description,
                }
            ] 
        }, {
            merge: true 
        });
        
    }
}

/* Get company id by email */
export async function get_company_id_by_email (email) {
    validate_connection();
    let company = collection(
        FIRESTORE_DB ,
        "company"
    );
    let q = query(
        company , 
        where("email" , "==" , email)
    )
    let snapShot = await getDocs(q);
    let last_id;
    
    snapShot.forEach((doc) => {
        /* get first result only */ 
        last_id = doc.id;
        return;
    });
    return last_id;
}

/* Get company data by id */
export async function get_data_by_id (id) { 
    validate_connection();

    let company = collection(
        FIRESTORE_DB,
        "company"
    );

    let d = doc(
        company,
        id
    );

    let snapshot = await getDoc(d);
    if (snapshot.exists()) 
        return snapshot.data();
    
    return null;
}


/* Get company image by uid */
export async function get_company_profile_images_by_uid (uid) {
    let storage   = getStorage();
    let path      = `company/${uid}/profile/`;
    let dp_ref    = ref(storage , `${path}/dp.jpeg`);
    let cover_ref = ref(storage , `${path}/cover.jpeg`);

    var images = {
       dp    : null ,
       cover : null ,
    };

    await getDownloadURL(dp_ref)
    .then((dl_url) => {
        images.dp = dl_url;
    })
    .catch((err) => {
        console.log(err.code);
    });

    await getDownloadURL(cover_ref)
    .then((dl_url) => {
        images["cover"] = dl_url;
    })
    .catch((err) => {
        console.log(err.code);
    });
    return images;
}




