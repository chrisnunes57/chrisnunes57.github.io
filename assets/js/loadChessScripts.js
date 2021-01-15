if (window.matchMedia("screen and (min-device-width: 1024px)").matches) {
    console.log("on desktop")

    const jquery = document.createElement("script");
    jquery.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js");
    jquery.setAttribute("integrity", "sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==");
    jquery.setAttribute("crossorigin", "anonymous");
    jquery.setAttribute("async", "false");
    document.body.appendChild(jquery);

    const chessboard = document.createElement("script");
    chessboard.setAttribute("src", "https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js");
    chessboard.setAttribute("integrity", "sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD");
    chessboard.setAttribute("crossorigin", "anonymous");
    chessboard.setAttribute("async", "false");

    const chess = document.createElement("script");
    chess.setAttribute("src", "../assets/js/chess.js");
    chess.setAttribute("defer", "defer");
    chess.setAttribute("async", "false");
    document.body.appendChild(chess);

    const chessGame = document.createElement("script");
    chessGame.setAttribute("src", "../assets/js/chessGame.js");
    chessGame.setAttribute("type", "module");
    chessGame.setAttribute("defer", "defer");
    chessGame.setAttribute("async", "false");

    // manage dependencies 
    jquery.onload = (e) => {
        document.body.appendChild(chessboard);
    }
    
    chessboard.onload = (e) => {
        document.body.appendChild(chessGame);
    };

    
}