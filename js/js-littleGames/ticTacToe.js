let squares = document.querySelectorAll(".row");
let turn = "X";
let isGameOver = false;
let img = document.createElement("img");

let message = document.querySelector("#message");
message.style.color = "#fff";
message.style.fontSize = "3rem";

document.querySelector("#again").addEventListener("click",() =>{
    resetGame(), 
    playAgain()
})

let you = document.querySelectorAll(".level")[0];
let computer = document.querySelectorAll(".level")[1];

squares.forEach(square => {
    square.innerHTML = "";
    square.addEventListener("click", () => {
        if(!isGameOver && !square.querySelector("img")) {
            let newImage = document.createElement("img");
            img.src = "../../img/img-littlegames/cross.png";
            newImage.src = img.src;
            square.appendChild(newImage);
            square.style.backgroundColor = "#CD6C21";
            checkWin();
            if(!isGameOver){
                setTimeout(computerChoice, 800)
            }
            checkDraw();
        }
    });
});

function changeTurn() {
    turn = turn === 'X' ? 'O' : 'X';
    document.querySelectorAll(".turn-box")[0].style.backgroundColor = turn === "O" ? "#3d7cca": "";
    document.querySelectorAll(".turn-box")[1].style.backgroundColor = turn === "X" ?"#3d7cca" : "";
}

function computerChoice(){
    if(isGameOver) return;

    let indexes = [];
    squares.forEach((square, index) => {
        if(!square.querySelector("img")){
            indexes.push(index)
        }
    })

    if(indexes.length > 0){

    }
    let elemento = indexes[Math.floor(Math.random() * indexes.length)];
    let circleImg = document.createElement("img")
    circleImg.src = "../../img/img-littlegames/circle.png";

    squares[elemento].appendChild(circleImg);
    squares[elemento].style.backgroundColor = "#CD6C21";

    checkWin();
    if(!isGameOver) {
        changeTurn();
        checkDraw();
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for(let i = 0; i < winConditions.length; i++) {
        let square1 = squares[winConditions[i][0]].querySelector("img");
        let square2 = squares[winConditions[i][1]].querySelector("img");
        let square3 = squares[winConditions[i][2]].querySelector("img");
        
        if(square1 && square2 && square3 &&
           square1.src === square2.src && 
           square1.src === square3.src) {
            
            isGameOver = true;
            turn == "X" ? you.innerHTML++ : computer.innerHTML++;
            
            if(turn == "X"){
                message.innerHTML = "&#127881; You win &#127881";
            } else if(turn == "O"){
                message.innerHTML = "&#127881; Computer wins &#127881;";
            }

            for(let j = 0; j < 3; j++) {
                squares[winConditions[i][j]].style.backgroundColor = "#3d7cca";
            }

            setTimeout(() => {
                resetGame();
            }, 1000);
            return;
        }
    }
}

function checkDraw() {
    if(!isGameOver) {
        let isDraw = Array.from(squares).every(square => {
            return square.querySelector("img") !== null;
        })
        if(isDraw) {
            message.innerHTML = "&#129309; Draw &#129309;";
            isGameOver = true;
            setTimeout(() => {
                resetGame();
            }, 1500);
        }
    }
}

function resetGame() {
    message.innerHTML = "";
    squares.forEach(square => {
        square.innerHTML = "";
        square.style.backgroundColor = "";
    });
    document.querySelectorAll(".turn-box").forEach(box => {
        box.style.backgroundColor = "";
    });
    turn = "X";
    document.querySelectorAll(".turn-box")[1].style.backgroundColor = "#3d7cca";
    isGameOver = false;
}

function playAgain(){
    you.innerHTML = 0;
    computer.innerHTML = 0;
}