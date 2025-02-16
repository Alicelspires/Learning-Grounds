// Update products to the shopping bag ------------------------------
function updateProductsBag(){
    let shopping = document.querySelector('.shopping');
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    shopping.innerHTML = ''
    let total = 0;
    bag.forEach(item => {
        let divProduc = document.createElement('div')
        divProduc.setAttribute('class', 'products')
        divProduc.innerHTML = `
            <div class="bg-prod">
                <img src="../img/img-camperCafe/${item.img}">
                <p class="name-prod">${item.name}</p>
            </div>
            <div>
                <p class="desc-prod">${item.desc}</p>
            </div>
            <div class="price">
                <input type="number" min="1" value="${item.amount}" onchange="updateAmount('${item.name}', this.value)">
                <div class="new-price">$ ${Number(item.price).toFixed(2)}
                </div>
            </div>
            <button class="button-delete" id="button-delete" onclick="removeItem(event)"><img src="../img/img-camperCafe/cross.png"></button>`

        shopping.appendChild(divProduc)
        total += item.price * item.amount
    })
    document.querySelector('.total-price').innerText = `$ ` + total.toFixed(2)
}

// buying products and removing them to the localStorage ------------
function buyingProduct(){
    document.querySelector('.shopping').innerHTML =''
    document.querySelector('.total-price').innerHTML = 'U$ 0.00'
    localStorage.removeItem('bag')
    alert('Successful purchase');
}

// remove item from bag with each especific card button -------------

function removeItem(e){
    let buttonRemove = e.target.parentElement
    let divProductName = buttonRemove.querySelector('.name-prod').innerHTML
    buttonRemove.remove()
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
