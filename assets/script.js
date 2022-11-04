
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]


const cells = document.querySelectorAll("td");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurntext = document.querySelectorAll(".black-turn-text");
const winnerContainer = document.querySelectorAll(".winner-container");
let redsPieces = document.querySelectorAll(".red-piece");
let blacksPieces = document.querySelectorAll(".black-piece")
let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

document.getElementById("blackScore").innerText = `Black pieces count : ${blackScore}`;
document.getElementById("redScore").innerText = `Red pieces count : ${redScore}`;


///////////////////////


let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false, 
    fourteenthSpace: false,
    eighteenthSpace: false, 
    minusSeventhSpace: false, 
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

// Faz inicial 1.0 -- obter um integer com os id das peças

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};


// Faz initial 1.1 -- EventListeners para as peças de cada jogador quando é o turn dele

function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
       
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}


// Faz initial 1.2 -- function para meter as peça de cada jogador na variavel let playerPieces quando é o turn dele

function getPlayerPieces() {
    if (turn) {
        playerPieces = redsPieces;
        console.log(playerPieces)
    } else {
        playerPieces = blacksPieces;
        console.log(playerPieces)
    }
    removeCellonclick(); // para remover o onclick
    resetBorders();
}

// remove o evento onclick

function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// loop reset borders

function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "3px solid white #b8b8b8";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

// Reset das properties quando se resetar as borders

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

// Esta function é para dar o id da peça e da cell do click

function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}


function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

// Check se em diagonal tem o espaço para a peça ir lá, no fim, eu chamo a próxima function que é para "saltar" se tem uma peça

function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

// Mesmo check que na última function, só que aqui vou checkar se as peças a saltar são do lado do adversário & se tem bem uma peça em diagonal

function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
        && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
        && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] < 12 
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] < 12
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }
    checkPieceConditions();
}

// check conditions para dar o style border verde a as peças que se pode mover e não em todas 
// (ao king também porque senão o jogador quando passar uma peça em king já não tem a border function)

function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

// border green quando uma peça pode mexer (se um dos objectos são true)

function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        giveCellsClick();
    } else {
        return;
    }
}

// quando vou clicar na cell para onde quero meter a peça, ele vai ao onclick executar a function makeMove

function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

// function para remover a peça da cell antiga e meter na cells onde cliquei

function makeMove(number) {

    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";

    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<div class="red-piece king" id="${selectedPiece.pieceId}"></div>`;
            redsPieces = document.querySelectorAll(".red-piece");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<div class="red-piece" id="${selectedPiece.pieceId}"></div>`;
            redsPieces = document.querySelectorAll(".red-piece");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<div class="black-piece king" id="${selectedPiece.pieceId}"></div>`;
            blacksPieces = document.querySelectorAll(".black-piece");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<div class="black-piece" id="${selectedPiece.pieceId}"></div>`;
            blacksPieces = document.querySelectorAll(".black-piece");
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// function para add king a uma peça se ela estiver no fim do board, remove tambem as peça do Score count dos jogadores

function changeData(indexOfBoardPiece, IndexUpdated, removePiece) {

    board[indexOfBoardPiece] = null;
    board[IndexUpdated] = parseInt(selectedPiece.pieceId);

    if (turn && selectedPiece.pieceId < 12 && IndexUpdated >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && IndexUpdated <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }

    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--
            document.getElementById("blackScore").innerText = `Black pieces count : ${blackScore}`;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redScore--
            document.getElementById("redScore").innerText = `Red pieces count : ${redScore}`;
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}

///

function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

// function para dar a win

function checkForWin() {
    if (blackScore === 0) {
        for (let i = 0; i < winnerContainer.length; i++) {
            winnerContainer[i].style.color = "red";
            winnerContainer[i].textContent = "RED WINS!";
            winnerContainer[i].style.backgroundColor = "#5335179a";
            

        }
    } else if (redScore === 0) {
        for (let i = 0; i < blackTurntext.length; i++) {            
            winnerContainer[i].style.color = "black";
            winnerContainer[i].textContent = "BLACK WINS!";
            winnerContainer[i].style.backgroundColor = "#5335179a";
            
        }
    }
    changePlayerDisplay();
}

// function para saber o turn atual

function changePlayerDisplay() {
    if (turn) {
        turn = false;
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "rgba(255, 0, 0, 0.240)";
            blackTurntext[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "rgba(0, 0, 0, 0.240)";
            redTurnText[i].style.color = "red";
        }
    }
    givePiecesEventListeners();
}

givePiecesEventListeners();