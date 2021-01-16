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
let url = parseUrl();
let viewRef;

// detect which event we need to use
let isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
let eventName = isOnIOS ? "pagehide" : "beforeunload";

setupTracking();

function setupTracking() {

    // don't want to track localhost stats
    // if (url.includes("localhost:"))
    //     return;

    // update this url with page view
    updatePageViews();
}

async function updatePageViews() {

    if (window.localStorage.getItem("user") === null) {
        window.localStorage.setItem("user", generateToken(12));
    }

    // update main view count
    db.collection("urls").doc(url).set({
        views: firebase.firestore.FieldValue.increment(1)
    }, { merge: true });

    // add specific view object
    viewRef = await db.collection('urls').doc(url).collection("views").add({
        user: window.localStorage.getItem("user"),
        timestamp: startTime,
        url: url
    });

    
}

// log end time when done
// @TODO: make this work on mobile?
window.addEventListener(eventName, async (e) => {
    console.log("in here")
    viewRef.set({
        duration: Date.now() - startTime,
    }, {merge: true});
});

// converts window.location.href to a firestore-usable string
function parseUrl() {
    let temp = window.location.href;

    if (temp.startsWith("https")) {
        temp = temp.substring(8);
    } else {
        temp = temp.substring(7);
    }

    temp = temp.replaceAll("/", "\\\\");

    return temp;
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
