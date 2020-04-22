const table = document.querySelector('table');
const tds = table.querySelectorAll('td');

const xSquares = [];
const oSquares = [];
const squareAlreadyCheck = new Set();

const players = ["X", "O"];
let currentPlayer = 0;

const winPossibilities = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
  ]

tds.forEach((td) => {
    td.addEventListener('click', ({target}) => checkSquare(target));
});

const checkSquare = (square) => {
    if(squareAlreadyCheck.has(square)) {
        console.log('Square already add, select other')
        return;
    } 
    
    check(square);
    const win = wins((currentPlayer ? oSquares : xSquares));

    if(win) {
        console.log(`The player ${players[currentPlayer]} wins!`)
        return;
    } 

    changePlayer();
}

const check = (square) => {
    squareAlreadyCheck.add(square);
    changeSquareColor(square);  
    addSquareToPlayer(square);
} 

const changeSquareColor = (square) => {
    square.style.filter = "brightness(.6)";
};

const addSquareToPlayer = (square) => {
    
    const addTextToSquare = (square) => {
        const span = document.createElement('span');
        span.textContent = players[currentPlayer];
        square.append(span);
    }

    const specifyPlayer = (square) => {
        const squareIndex = square.id
        currentPlayer ? oSquares.push(squareIndex) : xSquares.push(squareIndex);
    }

    addTextToSquare(square);
    specifyPlayer(square);
}

const changePlayer = () => {
    currentPlayer = +(!currentPlayer);
}

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