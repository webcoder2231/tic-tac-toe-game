const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const reStartBtn = document.querySelector('#restart');

const drawBoard = () => {
    boxes.forEach((box,index) => {
        let styleString = '';
        if (index < 3) {
            styleString += 'border-bottom: 3px solid var(--text);';
        }
        if (index % 3 === 0) {
            styleString += 'border-right: 3px solid var(--text);';
        }
        if (index % 3 === 2) {
            styleString += 'border-left: 3px solid var(--text);';
        }
        if (index > 5) {
            styleString += 'border-top: 3px solid var(--text);';
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked);
    });
};
const spaces = [];
const tickCircle = 'O';
const tickCrossed = 'X';
let currentPlayer = tickCircle;

const boxClicked = (event) => {
    const id = event.target.id;
    console.log(event);
    if (!spaces[id]) {
        console.log(spaces[id]);
        spaces[id] = currentPlayer;
        event.target.innerText = currentPlayer;

        if (playerWon()) {
            text.innerText = `${currentPlayer} has won!`;
            reStartBtn();
            return;
        }

        if (playerDraw()) {
            return;
        }
        currentPlayer = currentPlayer === tickCircle?
        tickCrossed : tickCircle;
    }
};

const playerWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins up to top`;
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the left`;
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins diagonally`;
            return true;
        }
    }
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the right`;
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the bottom`;
            return true;
        }
    }
    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins vertically on the middle`;
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
            return true;
        }
        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins diagonally`;
            return true;
        }
    }
};

const playerDraw = () => {
    let draw = 0;
    spaces.forEach((space, index) => {
        if (spaces[index] !== null) draw++;
    });
    if (draw === 9) {
        text.innerText = `Draw`;
        reStart(setTimeout(9000));
    }
};

const reStart = () => {
    setTimeout(() => {
        spaces.forEach((space, index) => {
            spaces[index] = null;
        });
        boxes.forEach((box) => {
            box.innerText = '';
        });
        text.innerText = `start`;
        strategy.innerText = ``;
    }, 1000);
};

reStartBtn.addEventListener('click', reStart);
reStart();
drawBoard();