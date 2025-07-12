// Render the navbar desktop default pattern
function navbar(){
    let header = document.querySelector(".header");
    let url = window.location.pathname.split("/").pop()

    header.innerHTML = `
        <nav class="navegation-bar">
            <div class="home">
                <a href="${url != 'bag.html' && url != 'search.html' ? "#" : "./camper_cafe.html"}">
                    <img class="logo-icone" src="../../assets/img/img-camperCafe/icons8-logoCamperCafe.png" alt="Camper Cafe logo">
                    <h3 class="logotipo">Camper Cafe</h3>
                </a>
            </div>
            <div class="button_logo">
                ${url != 'search.html' ? '<a href="./search.html">Menu</a>' : ""}
                <a href="#">Contacts</a>
                ${url != 'bag.html' ? 
                    `<a href="./bag.html">
                        <button type="submit">
                            <img src="../../assets/img/img-camperCafe/icons8-menu-de-restaurante-96.png" alt="icon_bag">
                            Bag
                        </button>
                    </a>` : ""
                }
                <a href="../../index.html"><img class="logo-icone" src="../../assets/img/common/logo/icons8-logoProj-white.png" alt="logo free Code Camp"></a>
            </div>
            <img class="toggle-btn" src="../../assets/img/img-camperCafe/menu-white.png" alt="close-menu">
        </nav>
        <div class="dropdown-menu"></div>
    `
    if(url == 'bag.html'){
        header.style.background ="rgba(29, 29, 42, 0.75)";
    }
}

// render the footer on every page
function footer(){
    let footer = document.querySelector("footer");
    footer.innerHTML += `
        <div class="footer-infos">
            <div class="apres-footer">
                <div class="logo-footer">
                    <img src="../../assets/img/common/logo/icons8-logoProj-white.png" alt="logo">
                    <h2>Learning Grounds</h2>
                </div>
                <p>A collection of small web projects developed during FreeCodeCamp’s “Responsive Web Design” and “JavaScript Algorithms and Data Structures” courses, with added inspiration from The Odin Project.
                This portfolio brings together creative builds and refinements that showcase foundational web development skills, combining clean design principles with dynamic, interactive features.</p>
            </div>
            <div class="medias">
                <a href="https://www.linkedin.com/in/alice-silva-7596b92a3/" target="_blank">
                    <i class="fa-brands fa-github"></i>
                    <p>linkedin.com/in/alice-silva</p>
                </a>  
                <a href="https://github.com/Alicelspires">
                    <i class="fa-brands fa-linkedin"></i>
                    <p>github.com/Alicelspires</p>
                </a>
                <a data-copy="alicelspiresmail.com" onclick="copy.call(this, event)" href="">
                    <i class="fa-solid fa-envelope"></i>
                    <p>alicelspires@gmail.com</p>
                </a>
            </div>
        </div>
        <hr>
        <p>Developed by Alice Silva</p>
    `
}

// Set the scroll style of the navbar
function scrollNavbar(){
    let header = document.querySelector(".header")
    let heroSection = document.querySelector(".hero-section")

    window.addEventListener("scroll", () => {
        // Takes the bottom position of the hero section relative to the screen top
        // When the screen top be on the same level line of the hero section bottom, it'll return 1, if it's below that line, it'll return a minus value
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if(heroSection){ // if exists the hero section on the page
            if(heroBottom <= 0){
                header.style.background ="rgba(29, 29, 42, 0.75)";
            } else {
                header.style.background ="linear-gradient(to bottom, #1D1D2A, transparent)";
            }
        } else {
            header.style.background ="rgba(29, 29, 42, 0.75)";
        }
    })
}

// Verify the size of the screen 
function isMobile() {
  return window.matchMedia("(max-width: 578px)").matches;
}

// Content of the dropdow passing the url to check which is the currenly page
function renderDropdownContent(url) {
  return `
    <div>
      ${url !== 'bag.html' ? `
        <a href="./bag.html">
          <button type="submit">
            <img src="../../assets/img/img-camperCafe/icons8-menu-de-restaurante-96.png" alt="icon_bag">
            Bag
          </button>
        </a>` : ""}
      ${url !== 'search.html' ? '<a href="./search.html">Menu</a>' : ""}
      <a href="#">Contacts</a>
      <a href="../../index.html">
        <img class="logo-icone" src="../../assets/img/common/logo/icons8-logoProj-white.png" alt="logo free Code Camp">
      </a>
    </div>
  `;
}

// Called from the bindNavbarEvent, it'll define, or not, the open class for the dropDown, its content and styles
function toggleDropdown() {
    const dropDownMenu = document.querySelector('.dropdown-menu');
    const header = document.querySelector('.header');
    const btnMenu = document.querySelector('.toggle-btn');
    const url = window.location.pathname.split("/").pop();

    const isOpen = dropDownMenu.classList.toggle('open');
    dropDownMenu.style.display = isOpen ? 'flex' : 'none';
    dropDownMenu.style.justifyContent = 'center'

    if (isOpen) {
        dropDownMenu.innerHTML = renderDropdownContent(url);
        header.style.backgroundColor = '#1d1d2aa1';
        header.style.backdropFilter = 'blur(5px)';
        btnMenu.src = '../../assets/img/img-camperCafe/cross-white.png';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
        btnMenu.src = '../../assets/img/img-camperCafe/menu-white.png';
    }
}

// Define what it'll be displayed on the screen
function updateMenuView() {
  const menuDesktop = document.querySelector('.button_logo');
  const menuMobile = document.querySelector('.toggle-btn');
  const dropDownMenu = document.querySelector('.dropdown-menu');
  const header = document.querySelector(".header");

    if (isMobile()) {
        // Ensures that when the dropdown is opened and the page is scrolled to desktop and then back to mobile, the btnMenu is hamburger-style and not x icon
        const btnMenu = document.querySelector('.toggle-btn');
        btnMenu.src = '../../assets/img/img-camperCafe/menu-white.png';

        menuMobile.style.display = 'block';
        menuDesktop.style.display = 'none';
    } else {

        // When it's not the mobile size, it'll display the default navbar
        menuMobile.style.display = 'none';
        menuDesktop.style.display = 'flex';

        // hide the dropDown and remove the open class 
        dropDownMenu.style.display = 'none';
        dropDownMenu.classList.remove('open');

        // Go back to the default style version
        header.style.backdropFilter = 'none';
    }
}

// Takes the actual navbar style defined on the updateMenuView function
function bindNavbarEvents() {
  const btnMenu = document.querySelector('.toggle-btn');
    // If the btnMenu was displayed
    if (btnMenu) {

        //  Every click on this button, it'll called the toggleDropDown function
        btnMenu.addEventListener('click', toggleDropdown);
    }

    // If the btnMenu is not displayed when resize the page, it'll called the updateMenuView function again
    window.addEventListener('resize', updateMenuView);
}

window.addEventListener('DOMContentLoaded', () => {
  navbar(); 
  footer();    
  scrollNavbar(); 
  updateMenuView();
  bindNavbarEvents();
});
