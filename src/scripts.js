const table = document.querySelector('table');
const tds = table.querySelectorAll('td');

const xSquares = [];
const oSquares = [];
const squareAlreadyCheck = new Set();

const players = ["X", "O"];
let currentPlayer = 0;

tds.forEach((td) => {
    td.addEventListener('click', ({target}) => checkSquare(target));
});

const checkSquare = (square) => {
    if(squareAlreadyCheck.has(square)) {
        console.log('Square already add, select other')
        return;
    } 
    
    check(square);
    changePlayer();
}

const check = (square) => {
    squareAlreadyCheck.add(square);
    changeSquareColor(square);  
    addTextToSquare(square);
} 

const changeSquareColor = (square) => {
    square.style.filter = "brightness(.6)";
};

const addTextToSquare = (square) => {
    const span = document.createElement('span');
    span.textContent = players[currentPlayer];
    square.append(span);
}

const changePlayer = () => {
    currentPlayer = +(!currentPlayer);
}