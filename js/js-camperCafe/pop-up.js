import {products} from './products.js';
import {AddCardProducts} from './script-campercafe.js';

let cards = document.querySelectorAll(".card")
let popUp = document.querySelector(".pop-upArea");
let overlay = document.querySelector(".overlay");

document.querySelectorAll(".info-coffee").forEach((info, indexInfo)=>{
    info.addEventListener('click', () => {
        let eachPopUp;
        
        cards.forEach((card, indexCard) => {
            if (indexInfo == indexCard){
                eachPopUp = `
                <div class="pop-ups">
                    <div class="main-content">
                        <div class="img-prod">
                            <img src="../img/img-camperCafe/${products[indexCard].img}" alt="">
                        </div>

                        <div class="desc-info">
                            <h2>${products[indexCard].name}</h2>
                            <p>${products[indexCard].about}</p>
                            <div class="instructions">
                                
                            </div>
                        </div>
                    </div>

                    <div class="sections-price-btns">
                        <span class="pricePopUp">$ ${products[indexCard].price.toFixed(2)}</span>
                        <div class="pricing">
                            <button class="adding" type="submit" id="btn" data-index="${indexCard}">Add</button>
                            <button class="back" id="back">Back &#x2934;</button>
                        </div>
                    </div>
                </div>`;

                popUp.innerHTML = eachPopUp;

                overlay.style.display = "block";
                popUp.style.display = "block";

                let instructions = document.querySelector(".instructions");

                for(let i = 0; i < products[indexCard].ingredientes.length; i++){
                    instructions.innerHTML += `
                                    <span class="instru">
                                        <p>${products[indexCard].ingredientes[i]}</p>
                                        <span class="bold">${products[indexCard].values[i]}</span>
                                    </span>
                                `
                } 
            }
        })
    }); 
    
})


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("back")) {
        overlay.style.display = "none";
        popUp.style.display = "none";
        popUp.innerHTML = '';
    }
    if (event.target.id === "btn") {
        let index = event.target.getAttribute("data-index");
        AddCardProducts(index);
    }
});
