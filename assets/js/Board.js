const STARTING_POS = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";

class Board {
    constructor(gameID=null) {
        console.log("made board for game " + gameID);

        const config = {
            draggable: true,
            dropOffBoard: 'snapback', // this is the default
            position: STARTING_POS,
            onSnapEnd: this.onSnapEnd,
            onDragStart: this.onDragStart,
            onDrop: this.onDrop
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

        // we're playing now
        if (!this.gameActive) {
            this.gameActive = true;
        }

        let data = JSON.parse(content);

        console.log("board data");
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

            console.log("WEBSITE PIECE COLOR IS " + this.pieceColor)
        }

        let moves;

        if (data.state) {
            moves = data.state.moves.split(" ");
        } else {
            moves = data.moves.split(" ");
        }

        if (this.game.fen() === STARTING_POS) {
            // we need to catch up on moves

            moves.forEach(move => {
                this.game.move(move, { sloppy: true });
            })

            // game is updated, now update gui
        } else {
            // we only have one new move
            this.game.move(moves[moves.length - 1], { sloppy: true });

        }

        this.updateGui();
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