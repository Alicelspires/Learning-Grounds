import { infos } from "./projectsInfos.js";

function projects() {
    const main = document.querySelector("#projects");
    
    infos.forEach((info) => {
        const link = document.createElement('a');
        link.href = `${info.link}`;

        const section = document.createElement("section");

        section.style.background = `url('./assets/img/img-startPage/${info.img}')`;
        section.style.backgroundSize = "cover";
        section.style.backgroundPosition = "center";
        
        section.innerHTML = `
            <div class="infos-project">
                <h2>${info.title}</h2>
                <p>${info.text}</p>
            </div>
            <div class="languages">
                <i class="fa-brands fa-html5"></i>
                <i class="fa-brands fa-css3-alt"></i>
                <i class="fa-brands fa-square-js"></i>
            </div>
        `;
        
        link.appendChild(section)
        main.appendChild(link);
    });
}


// Calling function
projects();