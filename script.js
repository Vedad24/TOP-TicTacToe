
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
    }

    const renderBoard = function (where) {
       /*  fields.forEach((field, ind) => {
            field.innerHTML = boardArray[ind++];
        }); */
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
                resetBoard();
            }
        }
    }

    const checkTie = function () {
        if (moveCounter > 8) {
            console.log("Tie");
            resetBoard();
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
    }

    
    return {
        init,
        renderBoard,
        makeMove
    }
}();

gameBoard.init();