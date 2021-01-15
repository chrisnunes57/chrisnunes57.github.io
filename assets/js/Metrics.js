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

let db = firebase.firestore();

setupTracking();

function setupTracking() {

    let url = window.location.href;

    // don't want to track localhost stats
    // if (url.includes("localhost:"))
    //     return;

    console.log("made it ")

    // update this url with page view
    incrementPageViews(url);
}

async function incrementPageViews(url) {
    
    if (url.startsWith("https")) {
        url = url.substring(8);
    } else {
        url = url.substring(7);
    }

    url = url.replaceAll("/", "\\\\")

    db.collection('urls').doc(url).set({ 
        views: firebase.firestore.FieldValue.increment(1), 
        url: url 
    }, { merge: true });
}