import {products} from './products.js';

// Cards -----------------------------------------------------

let mainCards = document.querySelector('.main-cards');
let product = '';

products.forEach((prod) => {
    product+=`
            <div class="card">
                <div class="form">
                    <img src="../img/img-camperCafe/${prod.img}" alt="${prod.name}">
                </div>
                <p>${prod.name}</p>
                <div class="pricing">
                    <p>R$ <span>${prod.price.toFixed(2)}</span></p>
                    <button type="submit" id="btn">Add</button>
                </div>
            </div>`
    mainCards.innerHTML = product
})

// Search ------------------------------------------------------

let search = document.querySelector('#search-bar')
search.addEventListener('keyup', searching)

function searching(){
    let textInput = this.value.toLowerCase()
    let cards = document.querySelectorAll('.card');
    let numberMatches = 0;

    cards.forEach(card => {
        if(card.childNodes[3].innerText.toLowerCase().indexOf(textInput) > -1){
            card.style.display = ''
        } else {
            card.style.display = 'none';
            numberMatches ++
        }

    });

    let existingMessage = document.querySelector('.message'); 
    
    if (!existingMessage){
        if(numberMatches == cards.length){
            let mainCards = document.querySelector('.main-cards')
            let divMessage = document.createElement('div')
            divMessage.setAttribute('class', 'message')
            divMessage.innerHTML ='<h2>Sorry, we couldn\'t recognize this product</h2>'
            mainCards.appendChild(divMessage)
        }
    } else {
            existingMessage.remove();
        
    }
}

// add products to the shopping bag ---------------------------------
document.querySelectorAll('#btn').forEach((button, index) =>{
    button.addEventListener('click', () =>{
    AddCardProducts(index)})
})

function AddCardProducts(index){
    let product = products[index]
    let bag = JSON.parse(localStorage.getItem('bag')) || []
    let foundProduc = bag.find(item => item.name == product.name)
    if(foundProduc){
        foundProduc.amount++
    } else {
        bag.push({name:product.name ,price:product.price, desc:product.desc, amount: 1, img:product.img})
    }
    localStorage.setItem('bag', JSON.stringify(bag));
    alert('Product added to your bag')
}

// 
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
            <p class="desc-prod">${item.desc}</p>
            <div class="price">
                <input type="number" min="1" value="${item.amount}" onchange="updateAmount('${item.name}', this.value)">
                <div class="new-price"> U$ ${Number(item.price).toFixed(2)}
                </div>
            </div>
            <button class="button-delete" id="button-delete" onclick="removeItem(event)"><img src="../img/img-camperCafe/cross.png"></button>`

        shopping.appendChild(divProduc)
        total += item.price * item.amount
    })
    document.querySelector('.total-price').innerText = `U$ ` + total.toFixed(2)
}

// buying products and removing them to the localStorage ------------
function buyingProduct(){
    document.querySelector('.shopping').innerHTML =''
    document.querySelector('.total-price').innerHTML = 'U$ 0.00'
    localStorage.removeItem('bag')
    alert('Compra finalizada com sucesso');
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
    console.log(`Produto '${divProductName}' removido com sucesso!`);
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
