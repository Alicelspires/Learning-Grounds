import {getAccounts, setAccounts} from './login.js'
import {videos} from "./videos.js"

function dropDown(){
    document.querySelector('.dropdown-toggle').addEventListener('click', () => {
        document.querySelector('.dropdown-menu').classList.toggle('show');
    });

    document.querySelector('#logout').addEventListener('click', () => {
        localStorage.removeItem("loggedUserId");
        window.location.href = './login.html';
    });

    document.querySelector('#removeAccount').addEventListener('click', () => {
        removeAccount();
    });

}

function removeAccount(){
    const accounts = getAccounts();
    const loggedId = parseInt(localStorage.getItem("loggedUserId"));

    if (!loggedId) {
        alert("No logged-in user found.");
        return;
    }

    const updatedAccounts = accounts.filter(acc => acc.id !== loggedId);
    setAccounts(updatedAccounts);

    localStorage.removeItem("loggedUserId");
    window.location.href = './login.html';
}

function welcomePage() {
    const welcomeUserName = document.querySelector('#welcome');
    if (!welcomeUserName) return;

    const loggedId = localStorage.getItem('loggedUserId');
    const accounts = getAccounts();
    const currentUser = accounts.find(acc => acc.id == loggedId);
    const name = currentUser.user.charAt(0).toUpperCase() + currentUser.user.slice(1)

    if (currentUser) {
        welcomeUserName.innerHTML = `Welcome ${name}<br>and enjoy the sound!`;
    } else {
        welcomeUserName.innerHTML = 'Welcome <br> and enjoy the sound';
    }
}

function videosList() {
    const videosGrid = document.querySelector('.videos');
    videosGrid.innerHTML = ''; // limpa ao recarregar

    videos.forEach((card) => {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video-card');

        videoDiv.innerHTML = `
            <iframe src="${card.link}L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div class="video-info">
                <p class="video-title">${card.title}</p>
                <p class="video-meta">${card.author} • ${card.date}</p>
            </div>
        `;

        videosGrid.appendChild(videoDiv);
    });
}

function search() {
    const searchInput = document.querySelector('#searchInput');
    const videosContainer = document.querySelector('.videos');

    searchInput.addEventListener('keyup', () => {
        const value = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.video-card');

        let matchCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('.video-title').textContent.toLowerCase();

            if (title.includes(value)) {
                card.style.display = '';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const existingMessage = document.querySelector('.message');
        if (existingMessage) existingMessage.remove();

        if (matchCount === 0) {
            const noMatch = document.createElement('div');
            noMatch.className = 'message';
            noMatch.innerHTML = `<h2>Sorry, we couldn\'t recognize this video</h2>`;
            videosContainer.appendChild(noMatch);
        }
    });
}

// Calling functions
dropDown()
welcomePage()
videosList()
search()