
const gameBoard = function () {
    let boardArray = [
        "&#8192", "&#8192", "&#8192",
            "&#8192", "&#8192", "&#8192",
            "&#8192", "&#8192", "&#8192"
    ];

    this.winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let moveCounter = 0;

    const init = function () {
        cacheDOM();
        boardDOM.style.display = "grid";
        appendingListeners();
        renderBoard();
    }

    const cacheDOM = () => {
        this.boardDOM = document.querySelector(".board");
        this.fields = document.querySelectorAll(".box");
        this.dialogModal = document.querySelector("#dialog");
        this.playAgainButton = document.querySelector(".resetBoard");
        this.score = document.querySelector(".score");
        this.pointsX = 0;
        this.pointsO = 0;
    }

    const renderBoard = function () {
        for (let i = 0; i < 9; i++){
            if (boardArray[i] == "X") {
                let cross = document.createElement("img");
                cross.src = "Cross.png";
                cross.classList.add("imageX");
                document.querySelector(`.box-${i+1}`).appendChild(cross);
            } 
            if (boardArray[i] == "O") {
                let circle = document.createElement("img");
                circle.src = "circle.png";
                circle.classList.add("imageO");
                document.querySelector(`.box-${i+1}`).appendChild(circle);
            }
        }
    }
    
    const checkWin = function () {
        for (let index = 0; index < 8; index++) {
            let checkingSign = boardArray[winningConditions[index][0]];

            if (checkingSign != "&#8192" &&
                checkingSign == boardArray[winningConditions[index][1]] &&
                checkingSign == boardArray[winningConditions[index][2]])
            {
                console.log("Win for " + checkingSign);
                checkingSign == "X" ? pointsX++ : pointsO++; 
                score.innerHTML = `${pointsX} : ${pointsO}`;
                this.dialogModal.showModal();
            }
        }
    }

    const checkTie = function () {
        if (moveCounter > 8) {
            console.log("Tie");
            this.dialogModal.showModal();
        }
    }

    const resetBoard = () => {
        moveCounter = 0;
        boardArray = [
            "&#8192", "&#8192", "&#8192",
            "&#8192", "&#8192", "&#8192",
            "&#8192", "&#8192", "&#8192"
        ];
        document.querySelectorAll(".imageX").forEach(k => k.remove());
        document.querySelectorAll(".imageO").forEach(k => k.remove());
        document.querySelectorAll(".x").forEach(k => k.classList.remove("x"));
        document.querySelectorAll(".o").forEach(k => k.classList.remove("o"));
    }

    const makeMove = function () {
        if (this.innerHTML != "X"  && this.classList[3] != "x" && this.classList[3] != "o" && this.innerHTML != "O") {
            if (moveCounter % 2 == 0) {
                boardArray[+(this.classList[0]) - 1] = "X";
                this.classList.add("x");
            }
            else {
                boardArray[+(this.classList[0]) - 1] = "O";
                this.classList.add("o");
            }
            moveCounter++;
            checkWin();
            checkTie();
            renderBoard(this.classList[2]);
        }
    };

    const appendingListeners = function () {
        document.querySelectorAll(".box").forEach(btn => {
            btn.addEventListener("click", makeMove)
        })
        document.querySelector(".resetBoard").addEventListener("click", () => {
            this.dialogModal.close();
        })
        this.playAgainButton.addEventListener("click", resetBoard);
    }

    
    return {
        init,
        renderBoard,
        makeMove,
    }
}();

const startScreen = function () {
    const init = function () {
        cacheStartDOM();
        appendingListeners();
    }

    const cacheStartDOM = () => {
        this.startButton = document.querySelector(".startButton");
        this.inputXElement = document.querySelector(".inputX");
        this.inputOElement = document.querySelector(".inputO");
        this.scoreElement = document.querySelector(".scoreboard");
        this.dialogElement = document.querySelector("#dialog");
        this.nameX = document.querySelector("#playerX");
        this.nameO = document.querySelector("#playerO");
    };

    const createScoreboard = () => {
        const names = document.createElement("h2");
        names.classList.add("names");
        names.innerHTML = `${this.nameX.value == "" ? "Player-1" : this.nameX.value} vs ${this.nameO.value == "" ? "Player-2" : this.nameO.value}`;
        const score = document.createElement("h2");
        score.classList.add("score");
        score.innerHTML = "0 : 0";
        this.scoreElement.appendChild(names);
        this.scoreElement.appendChild(score);
    }

    const startFunction = () => {
        this.startButton.style.display = "none";
        this.inputXElement.style.display = "none";
        this.inputOElement.style.display = "none";
        createScoreboard();
        gameBoard.init();
        this.dialogElement.style.display = "flex";
        this.scoreElement.style.display = "flex";
    };

    const appendingListeners = () => {
        this.startButton.addEventListener("click", startFunction);
    }

    return {
        init
    }

}();


startScreen.init();