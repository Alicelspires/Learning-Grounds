// Update products to the shopping bag ------------------------------
function updateProductsBag(){
    let shopping = document.querySelector('.shopping');
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    let total = 0;
    shopping.innerHTML = ''

    
    bag.forEach(item => {
        let divProduc = document.createElement('div');

        divProduc.setAttribute('class', 'products');

        divProduc.innerHTML = `
            <div class="card">
                <div class="form">
                    <img src="../../assets/img/img-camperCafe/coffees/${item.img}" alt="${item.name}">
                </div>
                <p class="name-prod">${item.name}</p>
                <div class="pricing">
                    <p>$ <span>${item.price.toFixed(2)}</span></p>
                    <button type="submit" class="info-coffee">
                        <img src="../../assets/img/img-camperCafe/arrow-left.png" alt="arrow">
                    </button>
                </div>
                <hr>
                <div class="update-bag">
                    <button class="button-delete" id="button-delete" onclick="removeItem(event)">
                    </button>
                    <div class="price">
                        <input type="number" min="1" value="${item.amount}" onchange="updateAmount('${item.name}', this.value)">
                    </div>
                </div>
            </div>`
        
        shopping.appendChild(divProduc)
        total += item.price * item.amount

        let url = window.location.pathname.split("/").pop()
        if(url == 'bag.html'){
            document.dispatchEvent(new CustomEvent('productsRendered'));
        }
 
    })
    document.querySelector('.total-price').innerText = `$ ` + total.toFixed(2)
}

// buying products and removing them to the localStorage ------------
function buyingProduct(){
    if(confirm('Are you sure you want to buy it?')){
        document.querySelector('.shopping').innerHTML =''
        document.querySelector('.total-price').innerHTML = 'U$ 0.00'
        localStorage.removeItem('bag')
    }
}

// remove item from bag with each card button -------------

function removeItem(e){
    let buttonRemove = e.target.parentElement;
    let cardRemove = buttonRemove.parentElement;

    let divProductName = cardRemove.querySelector('.name-prod').innerHTML

    cardRemove.remove()
    document.querySelector('.total-price').innerHTML = 'U$ 0.00'

    let bag = JSON.parse(localStorage.getItem('bag')) || []
    bag = bag.filter(item => item.name !== divProductName)
    localStorage.setItem('bag', JSON.stringify(bag));
}

// update amount
function updateAmount(name, amount){
    let bag = JSON.parse(localStorage.getItem('bag')) || []
    let product = bag.find(item => item.name == name);

    if(product){
        product.amount = amount;
        localStorage.setItem('bag', JSON.stringify(bag));
        updateProductsBag();
    }
}
