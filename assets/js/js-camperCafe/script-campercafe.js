import { products } from './products.js';

// Filter product to home page Camper Cafe
function productsHome() {
    const prevProducts = document.querySelector(".prevs");
    if (!prevProducts) return;

    prevProducts.innerHTML = products.slice(0, 4).map(prod => `
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
        </div>
    `).join('');
}

// Calling functions
productsHome() 