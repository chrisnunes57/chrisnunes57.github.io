import { Board } from "./Board.js";

const chessboardImage = document.getElementById("begin-game");
const chessWrapper = document.getElementById("wrapper");
const boardFace = document.getElementById("board1");
const exitGame = document.getElementById("exit-game");
const status = document.getElementById("status");
const challengeButton = document.getElementById("challenge");
const controls = document.getElementById("controls");
const fader = document.getElementById("fader");

let challengeID;

let board = new Board();

// window.localStorage.clear();

// initial check to see if there is an existing game
let gameID = window.localStorage.getItem("gameID");
console.log(gameID);

if (gameID) {
    setUpGameListener(gameID);
    challengeButton.style.display = "none";
}

challengeButton.onclick = async(e) => {
    // // create challenge
    let URL = `https://morning-wildwood-47395.herokuapp.com/challenge`;
    // let URL = `http://localhost:5000/challenge`;

    eventLoop(URL, handleChallengeStatus);

    setStatus("Challenge sent! Waiting for response...");
    challengeButton.style.display = "none";
}

chessboardImage.onclick = (e) => {

    if (!chessboardImage.classList.contains("active")) {
        showChessboard();
    }
}

function setStatus(message) {
    status.innerText = message;
}

function showChessboard() {
    let currentPos = boardFace.getBoundingClientRect();
    let boardStyle = getComputedStyle(boardFace);
    let challengeStyle = getComputedStyle(chessboardImage);

    let midpointX = window.innerWidth / 2;
    let midpointY = window.innerHeight / 2;

    let scaleFactor = 1.5;

    let newX = midpointX - currentPos.x - (parseInt(boardStyle.width) / 2) + 20;
    let newY = midpointY - currentPos.y - (parseInt(challengeStyle.height) / 2) + (parseInt(boardStyle.height) / 6);

    let newStyle = `--data-x: ${newX}px; --data-y: ${newY}px;`;

    chessWrapper.style = newStyle;
    boardFace.style = `--data-scale: ${scaleFactor}`;

    chessboardImage.classList.add("active");
    window.setTimeout(() => { 
        controls.classList.add("active");
        fader.classList.add("active");
    }, 700);

    exitGame.onclick = (e) => {
        if (!boardFace.contains(e.target)) {
            hideChessboard();
        }
    }
}

function hideChessboard() {
    exitGame.onclick = null;
    chessboardImage.classList.remove("active");
    controls.classList.remove("active");
    fader.classList.remove("active");
}

function handleChallengeStatus(rawData) {
    let data = JSON.parse(rawData);
    console.log(data)
    if (data.type === "challengeCreated") {
        // check for 'too many requests error'
        if (data.gameID === "Too Many Requests") {
            setStatus("Chess is temporarily disabled! There have been too many requests to the server.");
        }
        // we got a new challenge
        challengeID = data.gameID;
    } else if (data.type === "challengeDeclined") {
        setStatus("The challenge was declined! I must be busy :(")
    } else if(data.type === "challengeAccepted") {
        // here is where the game starts
        setStatus("Challenge accepted!")
        window.localStorage.setItem("gameID", challengeID);
        setUpGameListener(challengeID);
    }
}

function setUpGameListener(gameID) {
    // start listening for game state updates
    eventLoop("https://lichess.org/api/board/game/stream/" + gameID, board.updateGame);
    board.gameID = gameID;
    console.log("listening for updates for game " + gameID)
}

async function eventLoop(URL, callback) {
    try {
        console.log("beginning new event loop")
        const response = await fetch(URL, {
            headers: {
                "Authorization": "Bearer 3wErqfxmNrXAP3jR"
            }
        });

        const reader = response.body.getReader();

        let result;
        while (!result || !result.done) {
            result = await reader.read();
            let content = new TextDecoder("utf-8").decode(result.value).trim();
            if (content)
                callback(content);
        }

        console.log("event loop ended");
    } catch {}
}
