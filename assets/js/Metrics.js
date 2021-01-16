// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFyWor5GDJrCBVrJ50SA79o4xfB85npE0",
    authDomain: "nunes-metrics.firebaseapp.com",
    projectId: "nunes-metrics",
    storageBucket: "nunes-metrics.appspot.com",
    messagingSenderId: "690993114565",
    appId: "1:690993114565:web:e98a6e890947d95111afac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// setup stuff
const db = firebase.firestore();
const startTime = Date.now();


setupTracking();

function setupTracking() {

    let url = window.location.href;

    // don't want to track localhost stats
    // if (url.includes("localhost:"))
    //     return;

    // update this url with page view
    updatePageViews(url);
}

async function updatePageViews(url) {

    if (window.localStorage.getItem("user") === null) {
        window.localStorage.setItem("user", generateToken(12));
    }
    
    if (url.startsWith("https")) {
        url = url.substring(8);
    } else {
        url = url.substring(7);
    }

    url = url.replaceAll("/", "\\\\")

    let time = Date.now();

    db.collection("urls").doc(url).set({
        views: firebase.firestore.FieldValue.increment(1)
    }, { merge: true });

    db.collection('urls').doc(url).collection("views").add({ 
        user: window.localStorage.getItem("user"), 
        timestamp: startTime,
        url: url 
    });
}

function generateToken(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
