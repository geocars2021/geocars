

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
    uploadBytes    ,
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
    SUBSCRIPTION
}   
from "../states/subscription.js";


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

/******************* PROFILING *******************/
 
/* on update in current loggedin company */
export async function on_company_update (uid,callback) {
    validate_connection();

    let company = collection(
        FIRESTORE_DB ,
        "company"
    );

    let user_profile_images , snapshot;

    onSnapshot(doc(company, uid), ( async (doc) => {
        
        user_profile_images = await get_company_profile_images_by_uid(uid);
        snapshot = doc.data();

        // append user dp and cover | if exist!
        snapshot.dp    = user_profile_images.dp;
        snapshot.cover = user_profile_images.cover; 
        callback(snapshot);
        
    }));
}

/* saves new company */
export async function save_new_company (email,name,salt,passkey) {
    validate_connection();
    
    let company = collection(
        FIRESTORE_DB ,
        "company"    ,
    );

    // Do not store plain text password !!
    let docRef = await addDoc(company,{
        email   : email   ,
        name    : name    ,
        salt    : salt    ,
        passkey : passkey ,
        contact : "N/A"   , // set contact num as N/A
        address : "N/A"   , // set address as N/A
        plan    : SUBSCRIPTION.FREEMIUM , // set FREEMIUM as default plan,
    });
    
    await insert_activity(
        docRef.id,
        `${name} joined geocars.`
    )
    await insert_activity(
        docRef.id,
        `${name} joined geocars plus plus.`
    )
    
}

/* inserts activity to current loggedin company */ 
export async function insert_activity (uid,description) {
    validate_connection();

    let company , snapshot , activities;

    company = collection(
        FIRESTORE_DB ,
        "company"
    );

    snapshot = await get_data_by_id(uid);

    if (snapshot) {
        const newcomp = doc(company, uid );
        if (!snapshot.activities) {
            /* if activities is not present , create new one */ 
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
        else {
            // otherwise, append first then set
            activities = snapshot.activities;
            activities.push(
                {
                    date : get_date_now(),
                    description : description,
                }
            );
            await setDoc(newcomp,{ activities: activities } , {merge: true});
        }
        
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
    validate_connection();
    
    let storage   = getStorage();
    let path      = `company/${uid}/profile/`;
    let dp_ref    = ref(storage , `${path}/dp.jpg`);
    let cover_ref = ref(storage , `${path}/cover.jpg`);

    var images = {
       dp    : null ,
       cover : null ,
    };

    if (dp_ref  && cover_ref) {
       
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
    }
    return images;
}



/******************* CAR MANAGEMENT *******************/

// get cars by status eg: RUNNING | PARKED
export async function get_car_by_status (company_uid,status) {
    validate_connection();

    let company = collection(
        FIRESTORE_DB,
        "cars"
    );

    let q = query(
        company ,
        where(
            "owner"     ,
            "=="        ,
            company_uid ,
        ) ,
        where(
            "status" ,
            "=="     ,
            status   ,
        ),
    )

    let docSnapShot = await getDocs(q);
    let cars = [];
    docSnapShot.forEach((doc) => {
        cars.push({
            id   : doc.id,
            data : doc.data()
        });
    });
    return cars;
}

// getall cars by owner or company id
export async function get_cars_by_owner (company_uid) {
    validate_connection();

    let company = collection(
        FIRESTORE_DB,
        "cars"
    );

    let q = query(
        company ,
        where(
            "owner"     ,
            "=="        ,
            company_uid ,
        )
    );
    let docSnapShot = await getDocs(q);
    let cars = [];
    docSnapShot.forEach((doc) => {
        cars.push({
            id   : doc.id,
            data : doc.data()
        });
    });
    
    return cars;
}

// get saved car brands
export async function get_car_brands (uid) {
    validate_connection();

    let brands , cars;
    brands = [];
    cars = await get_cars_by_owner(uid);

    cars.forEach((data) => {
        if (!brands.includes(data.data.brand));
            brands.push(data.data.brand);
    });
   
    return brands;
}

// get saved car models
export async function get_car_models (uid) {
    validate_connection();

    let models , cars;
    models = [];
    cars   = await get_cars_by_owner(uid);

    cars.forEach((data) => {
        if (!models.includes(data.data.model));
            models.push(data.data.model);
    });
    return models;
}

// upload images or new added cars
export function upload_image (car_id,files) {
    validate_connection();

    let storage , storageRef;

    storage = getStorage();
    for (let idx = 0;idx < files.length;idx++) {
        
        storageRef = ref(storage,`cars/${car_id}/${files[idx].name}`);

        uploadBytes(storageRef,files[idx])
        .then((snapshot) => {
            // on uploaded
        })
        .catch((e)=>{
            // on upload error
        });
        
    }
}