let reset = document.querySelector("#reset");
let again = document.querySelector("#again");
let statusPoint = document.querySelectorAll("#status");
let answer = document.querySelector("#answer");
let handsChoice = document.querySelectorAll(".hand");
let info = document.querySelector('.info');
let resultPopUp = document.querySelector('.bg-popUp')
const scoreBoard = {
    wins: 0,
    losses: 0,
    ties:0,
}

// Function that gets both choices and display the result
function playGame(e){
    e.preventDefault;
    const typeHand = e.target.id;
    const getcomputersChoice = computersChoice();
    const winner = getWinner(typeHand, getcomputersChoice);

    statusPoint[0].innerHTML = scoreBoard.wins.toString().padStart(2, '0');
    statusPoint[1].innerHTML = scoreBoard.losses.toString().padStart(2, '0');
    statusPoint[2].innerHTML = scoreBoard.ties.toString().padStart(2, '0');

    answer.style.display = 'block';
    info.innerHTML = `
        <span class="winner you">
            <img src="../../assets/img/img-homeGames/${typeHand}.png" alt="">
            You
        </span>

        <img src="../../assets/img/img-camperCafe/cross.png" alt="x">

        <span class="winner computer">
            <img src="../../assets/img/img-homeGames/${getcomputersChoice}.png" alt="">
            Computer
        </span>
    `

    console.log(typeHand, getcomputersChoice);
}

// Function that allows the computer to choose its hand in the game
function computersChoice(){
    let rand = Math.floor(Math.random()*3);
    if(rand == 0){
        return 'rock';
    } else if(rand == 1){
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Function that gets the winner 
function getWinner(player, computer){
    
    if(player == computer){
        answer.innerHTML = 'IT\'S A DRAW'
        scoreBoard.ties ++;
    }
    else if(player == 'rock'){
        if(computer == 'paper'){
            answer.innerHTML = 'YOU LOSE';
            scoreBoard.losses ++;
        }
        else if(computer == 'scissors'){
            answer.innerHTML = 'YOU WIN'
            scoreBoard.wins ++;
        }
    }
    else if(player == 'paper'){
        if(computer == 'rock'){
            answer.innerHTML = 'YOU WIN'
            scoreBoard.wins ++;
        }
        else if(computer == 'scissors'){
            answer.innerHTML = 'YOU LOSE'
            scoreBoard.losses ++;
        }
    }
    else if(player == 'scissors'){
        if(computer == 'rock'){
            answer.innerHTML = 'YOU LOSE'
            scoreBoard.losses ++;
        }
        else if(computer == 'paper'){
            answer.innerHTML = 'YOU WIN'
            scoreBoard.wins ++;
        }
    }
}

// Reset button
function resetScore(){
    statusPoint[0].innerHTML = '00' 
    statusPoint[1].innerHTML = '00' 
    statusPoint[2].innerHTML = '00' 
    scoreBoard.wins = 0;
    scoreBoard.losses = 0;
    scoreBoard.ties = 0;

    answer.style.display = 'none';
    info.innerHTML = ``;
}

// final result of the game
function finalResult(){
    let count = scoreBoard.wins + scoreBoard.ties + scoreBoard.losses
    let message = '';

    if(scoreBoard.wins < scoreBoard.losses){
        message = 'How Sad'
    } else if(scoreBoard.wins <= scoreBoard.losses){
        message = 'Oh!, almost there'
    } else {
        message = 'Congratulations'
    }

    resultPopUp.style.display = 'block'
    resultPopUp.innerHTML = `
        <div>
            <h2>${message}</h2>
            <hr>
            <span>
                <p>Your score is <span class="value">${scoreBoard.wins}</span> point(s) out of <span class="value">${count}</span> rounds</p>
                <img width="150px;" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnl0MzY0ZTlhN3QyMGg4ejV5Nnhkd3Rwa24zbjk3OWQwM3Q4ZTVnZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ykZS4KGnpdlY2f7XHg/giphy.gif" alt="">
                <p>Share your results with your friends</p>
            </span>
            <span>
                <h4>Thank you for playing!!!</h4>
                <p>by Alice Silva</p>
            </span>
        </div>
    `
    resultPopUp.addEventListener("click", function(){
        resultPopUp.style.display = 'none';
    })
}

// Event Listeners
handsChoice.forEach((choice) => {choice.addEventListener('click', playGame)})
reset.addEventListener('click', resetScore);
again.addEventListener('click', finalResult);