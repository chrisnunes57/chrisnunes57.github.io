const STARTING_POS = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";

const status = document.getElementById("status");

function setStatus(message) {
    status.innerText = message;
}

class Board {
    constructor(gameID=null) {

        const config = {
            draggable: true,
            dropOffBoard: 'snapback', // this is the default
            position: STARTING_POS,
            onSnapEnd: this.onSnapEnd,
            onDragStart: this.onDragStart,
            onDrop: this.onDrop,
            pieceTheme: "/assets/img/chess/{piece}.png"
        }

        this.gameActive = false;
        this._gameID = gameID;
        this.guiBoard = Chessboard('board1', config);
        this.game = new Chess();

        window.onresize = this.guiBoard.resize;
    }

    set gameID(newID) {
        this._gameID = newID;
    }

    updateGame = (content) => {

        let data = JSON.parse(content);

        console.log(data);

        // check if this request contains user information
        if (data.black && data.white) {
            if (data.black.id === "chrisnunes") {
                this.pieceColor = "w";
                this.guiBoard.orientation("white");
            } else {
                this.pieceColor = "b";
                this.guiBoard.orientation("black");
            }
        }

        let moves;

        if (data.state) {
            moves = data.state.moves.split(" ");
        } else {
            moves = data.moves.split(" ");
        }

        if (!this.gameActive) {
            // many moves
            moves.forEach((move) => {
                this.game.move(move, {sloppy: 1});
            });
        } else {
            // we only have one new move
            this.game.move(moves[moves.length - 1], { sloppy: true });
        }

        if ((moves.length % 2 == 0 && this.pieceColor === "b") || (moves.length % 2 == 1 && this.pieceColor === "w")) {
            setStatus("Waiting....");
        } else {
            setStatus("Your Turn!");
        }
        this.updateGui();

        // check if the game is over
        if ((data.state && data.state.winner) || data.winner) {
            let winner = data.winner ?? data.state.winner;
            if (winner.charAt(0) === this.pieceColor) {
                setStatus("You win! Congrats!");
            } else {
                setStatus("You lose! Sorry :(");
            }

            this.gameActive = false;
            window.localStorage.clear();
            return;
        } 
    }

    updateGui = () => {
        this.guiBoard.position(this.game.fen());
    }

    onSnapEnd = () => {
        this.updateGui();
    }


    onDragStart = (source, piece, position, orientation) => {
        // do not pick up pieces if the game is over
        if (this.game.game_over()) 
            return false

        // TODO: only pick up your own pieces
        // only pick up pieces for the side to move
        if (piece.toLowerCase()[0] !== this.pieceColor) {
            return false
        }
    }

    onDrop = (source, target) => {
        // see if the move is legal
        let move = this.game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        })

        // illegal move
        if (move === null) {
            return "snapback";
        }

        // if move is legal, then we update the game state
        this.postMove(this._gameID, source+target);
    }

    postMove = async (gameID, move) => {

        let URL = `https://lichess.org/api/board/game/${gameID}/move/${move}`

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer 3wErqfxmNrXAP3jR"
            }
        });
    }
}


export { Board };