import { products } from './products.js';

function createPopUp(product) {
    return `
        <div class="pop-ups">
            <div class="main-content">
                <div class="img-prod">
                    <img src="../../assets/img/img-camperCafe/coffees/${product.img}" alt="${product.name}">
                </div>
                <div class="desc-info">
                    <h2>${product.name}</h2>
                    <p>${product.about}</p>
                    <div class="instructions"></div>
                </div>
            </div>
            <div class="sections-price-btns">
                <span class="pricePopUp">$ ${product.price.toFixed(2)}</span>
                <div class="pricing">
                    <button class="adding" type="submit" id="btn-popup">
                        <img src="../../assets/img/img-camperCafe/plusMath.png" alt="add">
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderInstructions(product) {
    const instructionsContainer = document.querySelector(".instructions");
    instructionsContainer.innerHTML = product.ingredientes.map((ingredient, i) => `
        <span class="instru">
            <p>${ingredient}</p>
            <span class="bold">${product.values[i]}</span>
        </span>
    `).join('');
}

function AddToBag(product) {
    const btn = document.querySelector('#btn-popup');

    btn.addEventListener('click', () => {
        let bag = JSON.parse(localStorage.getItem('bag')) || [];
        const existingProduct = bag.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.amount++;
        } else {
            bag.push({
                name: product.name,
                price: product.price,
                desc: product.desc,
                amount: 1,
                img: product.img
            });
        }

        localStorage.setItem('bag', JSON.stringify(bag));
        alert('Product added to your bag!');
        document.querySelector('.overlay').style.display = 'none';
    });
}

function overlayClose() {
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener("click", (event) => {
        if (event.target.classList.contains('overlay')) {
            overlay.style.display = 'none';
        }
    });
}

function displayPopUp() {
    const overlay = document.querySelector('.overlay');
    let url = window.location.pathname.split("/").pop()
    const infoButtons = document.querySelectorAll('button.info-coffee') || [];

    if(url != 'bag.html'){
        infoButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const product = products[index];
                overlay.innerHTML = createPopUp(product);
                overlay.style.display = 'block';

                renderInstructions(product);
                AddToBag(product);
            });
        });

    } else {
        infoButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.card');
                const productName = card.querySelector('.name-prod')?.innerText?.trim();
                const product = products.find(p => p.name === productName);

                overlay.innerHTML = createPopUp(product);
                overlay.style.display = 'block';

                renderInstructions(product);
                AddToBag(product);
            });
        });
    }

    overlayClose();
}

// Call main function
displayPopUp();
document.addEventListener('productsRendered', () => {
    displayPopUp();
});