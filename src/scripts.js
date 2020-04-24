const table = document.querySelector('table');
const tds = table.querySelectorAll('td');

tds.forEach((td) => {
    td.addEventListener('click', ({target}) => checkSquare(target));
});

const players = ["X", "O"];
let currentPlayer = 0; // 0 = X // 1 = O
let xSquares = [];
let oSquares = [];
let squareAlreadyCheck = new Set();

const winPossibilities = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
  ];

function wins(squaresSelected) {
    for(let i = 0; i < winPossibilities.length; i++) {
        let found = false;

        const possibility = winPossibilities[i];
        found = possibility.every(item => squaresSelected.includes(item))

        if(found) {
            return found;
        }
    }
}

const onRestart = () => {
    table.className = [];
    tds.forEach((td) => {
        if(td.children.length > 0) {
            removeSquareText(td);
            removeSquareColorSelected(td);
        }
    });

    restartAllSquares();
}



const restartAllSquares = () => {
    currentPlayer = 0;
    xSquares = [];
    oSquares = [];
    squareAlreadyCheck.clear();
};


const checkSquare = (square) => {
    if(squareAlreadyCheck.has(square)) {
        console.log('Square already add, select other')
        return;
    } 
    
    check(square);
    const win = wins((currentPlayer ? oSquares : xSquares));

    if(win) {
        table.className = ['dont-clickable'];
        console.log(`The player ${players[currentPlayer]} wins!`)
        return;
    } 

    changePlayer();
}

const check = (square) => {
    squareAlreadyCheck.add(square);
    addSquareColorSelected(square);  
    addTextToSquare(square);
    specifyPlayer(square);
} 

const addSquareColorSelected = (square) => {
    square.style.filter = "brightness(.6)";
};

const removeSquareColorSelected = (square) => {
    square.style.filter = '';
}

const addTextToSquare = (square) => {
    const span = document.createElement('span');
    span.textContent = players[currentPlayer];
    square.append(span);
}

const removeSquareText = (square) => {
    square.removeChild(square.children[0]);
};

const specifyPlayer = (square) => {
    const squareIndex = square.id
    currentPlayer ? oSquares.push(squareIndex) : xSquares.push(squareIndex);
}

const changePlayer = () => {
    currentPlayer = +(!currentPlayer);
    changeTitleCurrentPlayer(currentPlayer);
}

const changeTitleCurrentPlayer = (currentPlayer) => {
    document.querySelector('#titlePlayerTurn').textContent = `It's the player turn: ${players[currentPlayer]}`;
}

changeTitleCurrentPlayer(currentPlayer);