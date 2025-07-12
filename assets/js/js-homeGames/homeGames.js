import {gamesInfo} from "./homeGamesInfo.js"

function gamesCard(){
    let main = document.querySelector("main");

    gamesInfo.forEach((info) => {
        let link = document.createElement('a');
        link.href = `${info.link}`

        let container = document.createElement('div');
        container.classList.add('container');

        container.innerHTML += `
                <div class="infos">
                    <h2>${info.title}</h2>
                    <br>
                    <p>${info.text}</p>
                </div>
                <div class="arrow">
                    <img src="../../assets/img/img-homeGames/arrow.png" alt="${info.title}">
                </div>
        `
        container.style.backgroundImage = `url('../../assets/img/img-homeGames/${info.img}')`

        link.appendChild(container)
        main.appendChild(link)
    })
}

// Calling function
gamesCard()