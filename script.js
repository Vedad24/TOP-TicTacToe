
const gameBoard = function () {
    this.boardArray = [
        ["1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",]
    ];

    this.reset = [
       ["1", "2", "3",
        "4", "5", "6",
        "7", "8", "9",]
    ];

    this.boardDOM = document.querySelector(".board");
    this.fields = document.querySelectorAll(".box");
    this.winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let counter = 0;

    const renderBoard = function () {
        fields.forEach((field, ind) =>
            field.innerHTML = boardArray[0][ind++]
        );
        console.log(boardArray);
        checkWin();
    }
    
    const checkWin = function () {
        for (let index = 0; index < 8; index++) {
            if (boardArray[0][winningConditions[index][0]] == boardArray[0][winningConditions[index][1]] &&
                boardArray[0][winningConditions[index][0]] == boardArray[0][winningConditions[index][2]]
            ) {
                console.log("Win for " + boardArray[0][winningConditions[index][0]]);
            }
        }
    }
    const makeMove = function () {
        if (this.innerHTML != "X" && this.innerHTML != "O") {
            if (counter % 2 == 0) {
                boardArray[0][+(this.innerHTML) - 1] = "X";
            }
            else {
                boardArray[0][+(this.innerHTML) - 1] = "O";
            }
            counter++;
            renderBoard();
        }
    };

    document.querySelectorAll(".box").forEach(btn => {
        btn.addEventListener("click", makeMove)
    })
    
    return {
        renderBoard,
        makeMove
    }
}();


gameBoard.renderBoard();