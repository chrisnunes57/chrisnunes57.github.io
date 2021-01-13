import { Board } from "./Board.js";

const challengeButton = document.getElementById("challenge");
const games = {};
const boards = {};

let board = new Board();

console.log(localStorage)
// localStorage.setItem("gameID", "H3tMvKmR")

// begin playing
// beginGame();

challengeButton.onclick = async (e) => {
    // create challenge
    let URL = `https://lichess.org/api/challenge/chrisnunes`

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Authorization": "Bearer 3wErqfxmNrXAP3jR"
        }
    });

    beginGame();
}

function beginGame() {
    // begin listening for events
    console.log("beginning game")
    document.getElementById("challenge").style.display = "none";
    eventLoop("https://lichess.org/api/stream/event", handleEventContent);
}

function handleEventContent(content) {

    console.log("storage: " + localStorage.getItem("gameID"))

    let data = JSON.parse(content);
    console.log("driver data");
    console.log(data);
    

    if (data.type === "challenge") {

        let chal = data.challenge;

        // set a cookie to track the ID and status for this challenge
        localStorage.setItem("gameID", chal.id);
        localStorage.setItem("status", "CHALLENGE_SENT");

        if (chal.status === "created") {
            games[chal.id] = chal;
        }
    } else if (data.type === "challengeDeclined") {
        localStorage.removeItem("gameID");
        alert("challenge was declined.")
        console.log(localStorage.getItem("gameID"))
    } else if (data.type === "gameStart" && data.game.id === localStorage.getItem("gameID")) {
        let game = data.game;

        // set up listener for game events
        setUpGameListener(game.id);

    } else if (data.type === "gameState" && data.winner) {

    }else {
        console.log("Unknown message!");
        console.log(data);
    }
}

function setUpGameListener(gameID) {

    // start listening for game state updates
    eventLoop("https://lichess.org/api/board/game/stream/" + gameID, board.updateGame);
    board.gameID = gameID;
    console.log("listening for updates for game " + gameID)
}

async function eventLoop(URL, callback) {
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
}