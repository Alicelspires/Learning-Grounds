import {products} from './products.js';

// Cards -----------------------------------------------------

let mainCards = document.querySelector('.main-cards');
let eachProduct = '';

products.forEach((prod) => {
    eachProduct+=`
            <div class="card">
                <div class="form">
                    <img src="../img/img-camperCafe/${prod.img}" alt="${prod.name}">
                </div>
                <p>${prod.name}</p>
                <div class="pricing">
                    <p>$ <span>${prod.price.toFixed(2)}</span></p>
                    <button class="adding" type="submit" id="btn">Add</button>
                </div>
                <p class="info-coffee">Info &#x2197;</p>
            </div>`
    mainCards.innerHTML = eachProduct
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

export function AddCardProducts(index){
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
