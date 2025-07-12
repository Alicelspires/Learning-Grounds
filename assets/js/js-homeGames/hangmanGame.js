// Dinamic generate the keyboard
function alphabetKeyboard(){
    let letters = document.querySelector(".keyboard");

    for(let i = 97; i <= 122; i++){
        letters.innerHTML += `<div>${String.fromCharCode(i).toUpperCase()}</div>`
    }
}

// Fetch data by category
async function getRandomWord(){
    try{
        const res = await fetch('../../assets/js/js-homeGames/hangmanWords.json');
        const data = await res.json();

        return data

    }catch(e){
        console.log("Erro!", e);
    }
}

// Choose the category and generates a related word
function chooseCategory(){
    document.querySelector(".categories").addEventListener('click', async (event) => {
        const category = event.target.id;
        const words = await getRandomWord();
        const indexWord = Math.floor(Math.random()*50);

        event.target.style.backgroundColor = '#4B4B4B'; 
        startGame(words[category][indexWord]);
    })
}

// Running game
function startGame(word){
    let dashes = document.querySelector(".dashes");
    let hangmanImg = document.querySelector('#hangmanImg');
    let letters = document.querySelector(".keyboard");
    let wordsGuess = [];
    let wrongGuess = 0;
    let maxGuess = 6;

    // Dashes at the word length
    dashes.innerHTML = word.split("").map(() => {
        return `<div>_</div>`
    }).join("");

    // Verify if the letter click matches one of the word hidden letters
    letters.addEventListener('click', (event) => {
        let button = event.target
        let element = button.innerText.toLowerCase()

        if(word.includes(element)){
            [...word].forEach((letter, i) => {
                if(element == letter){
                    wordsGuess.push(letter)
                    dashes.querySelectorAll('div')[i].innerText = letter;
                }
            })

        } else {
            wrongGuess++
            hangmanImg.src = `../../assets/img/img-homeGames/hangman/hangman${wrongGuess}.svg`
        }

        button.classList.add('disabled');

        if(wrongGuess == maxGuess){gameOver(false, word)}
        if(wordsGuess.length == word.length){gameOver(true, word)}
    })
}

// Game over 
function gameOver(victory, word){
    let popUp = document.querySelector(".pop-up");
    setTimeout(() => {

        popUp.style.display = 'block';
        popUp.innerHTML = `
        <div>
            <h1>${victory == true ? "You Win" : "Game Over"}</h1>
            <hr>
            <span>
                <p>The correct word is</p>
                <h2>${word}</h2>
                <img width="150px;" src="${
                    victory == true ? 
                    "../../assets/img/img-homeGames/emoji-youwin.gif" : 
                    "../../assets/img/img-homeGames/emoji-gameover.gif"
                }" alt="">
            </span>
            <span>
                <h4>Thank you for playing!!!</h4>
                <p>by Alice Silva</p>
            </span>
        </div>
    `
        popUp.addEventListener("click", function(){
            popUp.style.display = 'none';
            window.location.reload()
        })

    }, 1000)

}

// Calling functions
alphabetKeyboard()
chooseCategory()