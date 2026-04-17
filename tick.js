// app.js
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true => O's turn, false => X's turn

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let gameOver = false;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        // put the appropriate symbol
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;

        // switch turn
        turnO = !turnO;

        // check for winner / draw
        checkWinner();
    });
});

const disableAllBoxes = () => {
    boxes.forEach(b => b.disabled = true);
}

const enableAllBoxes = () => {
    boxes.forEach(b => {
        b.disabled = false;
        b.innerText = "";
    });
    gameOver = false;
}

const showWinner = (winnerText) => {
    msg.innerText = winnerText;
    msgContainer.classList.remove("hide");
    disableAllBoxes();
    gameOver = true;
}

const checkWinner = () => {
    // read current board values (trim whitespace)
    const values = Array.from(boxes).map(b => b.innerText.trim());

    // check patterns
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const v1 = values[a], v2 = values[b], v3 = values[c];

        if (v1 !== "" && v1 === v2 && v2 === v3) {
            showWinner(`Congratulations — winner is ${v1}!`);
            return;
        }
    }

    // check draw: all boxes filled and no winner
    const allFilled = values.every(v => v !== "");
    if (allFilled) {
        showWinner("It's a draw!");
    }
};

const resetGame = () => {
    turnO = true;
    enableAllBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

// wire up buttons
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);