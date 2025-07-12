export function getAccounts(){
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

export function setAccounts(account){
    localStorage.setItem('accounts', JSON.stringify(account))
}

function setSignInInput(){
    let checkBox = document.querySelector('#check');
    let user = document.querySelector("#user")
    let title = document.querySelector("#title")
    let button = document.querySelector('#buttonTarget')

    if(!checkBox) return;

    checkBox.addEventListener("change", () => {
          if(checkBox.checked){
            button.innerText = 'Sign in'
            user.style.display = 'block';
            title.innerText = "Sign in";
            signIn()
        } else {
            button.innerText = 'Log in'
            user.style.display = 'none';
            title.innerText = "Log in"
            logIn()
        }
    })
}

function signIn(){
    let button = document.querySelector('#buttonTarget')
    let account = getAccounts();

    button.addEventListener('click', (e) => {
        e.preventDefault()
        let user = document.querySelector("#user").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        if(user == "" || email == "" || password == ""){
            alert("Fill out the fields")
        };

        let newAccount = {
            id: Date.now(),
            user: user,
            email: email,
            password: password
        }

        account.push(newAccount)
        setAccounts(account);
        window.location.href = './InstruPro.html'
    })
}

function logIn(){
    let button = document.querySelector('#buttonTarget')
    let account = getAccounts();

    if(!button) return

    button.addEventListener('click', (e) => {
        e.preventDefault()

        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        
        let accountFind = account.find(user => user.email === email && user.password === password)

        if(accountFind){
            localStorage.setItem("loggedUserId", accountFind.id);
            window.location.href = './instruPro.html'
        } else {
            alert("No user found with matching data, try again or create an account")
        }
    })

}

// Calling functions
setSignInInput()
logIn()
