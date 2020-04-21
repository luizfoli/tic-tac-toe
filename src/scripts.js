const table = document.querySelector('table');
const tds = table.querySelectorAll('td');

const players = ["X", "O"];
let currentPlayer = 0;

const squareAlreadyCheck = new Set();

function checkSquare(square) {
    squareAlreadyCheck.has(square) 
        ? console.log('Square already add, select other')
        : check(square);
}

function check(square) {
    squareAlreadyCheck.add(square);
    square.style.filter = "brightness(.6)";

    const span = document.createElement('span');
    span.textContent = players[currentPlayer];
    square.append(span);

    currentPlayer = +(!currentPlayer);
} 


tds.forEach((td) => {
    td.addEventListener('click', ({target}) => checkSquare(target));
});