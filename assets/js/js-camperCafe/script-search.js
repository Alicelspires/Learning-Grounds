import { products } from './products.js';

// Product card rendering function
function renderProducts() {
    const mainCards = document.querySelector('.main-cards');
    let html = '';
    
    products.forEach(prod => {
        html += `
            <div class="card">
                <div class="form">
                    <img src="../../assets/img/img-camperCafe/coffees/${prod.img}" alt="${prod.name}">
                </div>
                <p>${prod.name}</p>
                <div class="pricing">
                    <p>$ <span>${prod.price.toFixed(2)}</span></p>
                    <button type="submit" class="info-coffee">
                        <img src="../../assets/img/img-camperCafe/arrow-left.png" alt="arrow">
                    </button>
                </div>
            </div>`;
    });
    
    mainCards.innerHTML = html;
}

// Function to configure search
function setupSearch() {
    const search = document.querySelector('#search-bar');
    const mainCards = document.querySelector('.main-cards');
    
    search.addEventListener('keyup', function() {
        const textInput = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        let noMatches = 0;

        cards.forEach(card => {
            if (card.childNodes[3].textContent.toLowerCase().includes(textInput)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
                noMatches++;
            }
        });

        const existingMessage = document.querySelector('.message');
        if (noMatches === cards.length && !existingMessage) {
            const divMessage = document.createElement('div');
            divMessage.className = 'message';
            divMessage.innerHTML = '<h2>Sorry, we couldn\'t recognize this product</h2>';
            mainCards.appendChild(divMessage);
        } else if (existingMessage && noMatches < cards.length) {
            existingMessage.remove();
        }
    });
}

function filter(){
    let filterContent = document.querySelector('.filter');
    products.forEach((prod)=>{
        let filter = document.createElement('span');
        filter.innerText = prod.name;
        filterContent.appendChild(filter)
    })

    filterContent.addEventListener('click', (event) => {
        const cards = document.querySelectorAll('.card');
        const filterElement = event.target

        if(filterElement.classList.contains('disable')){
            filterElement.classList.remove('disable');
            renderProducts()
        } else {
            filterElement.classList.add('disable');
        }

        cards.forEach((card) => {
            if (card.childNodes[3].textContent.includes(filterElement.innerText)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

    })
}
// Calling functions
renderProducts();
setupSearch();
filter()