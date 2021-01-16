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
    if (url.includes("localhost:"))
        return;

    // update this url with page view
    incrementPageViews(url);
}

async function incrementPageViews(url) {

    let uniqueView = 0;

    if (window.localStorage.getItem("user") === null) {
        window.localStorage.setItem("user", generateToken(12));
        uniqueView = 1;
    }
    
    if (url.startsWith("https")) {
        url = url.substring(8);
    } else {
        url = url.substring(7);
    }

    url = url.replaceAll("/", "\\\\")

    db.collection('urls').doc(url).set({ 
        views: firebase.firestore.FieldValue.increment(1), 
        uniqueViews: firebase.firestore.FieldValue.increment(uniqueView),
        url: url 
    }, { merge: true });
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
