// JWT token string with header, payload and signature

let sessionToken

const sessionTokenString = 'AUTHTOKEN'
const mySecret = 'My Secret on the Server side', bearerPrefix = 'Bearer';

// send HTTP request, possibly with JSON body, and invoke callback when JSON response body arrives
export function sendJSON({method, url, body}, callback) {
    console.log("Entered sendJson function")
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            callback(undefined, JSON.parse(xhr.responseText))
        } else {
            callback(new Error(xhr.statusText))
        }
    })
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (sessionToken !== undefined) {
        xhr.setRequestHeader('Authorization', `Bearer ${sessionToken}`)
    }
    xhr.send(body !== undefined ? JSON.stringify(body) : undefined)
}

export function sendRegInfo({url,body}, callback){
    const xhr = new XMLHttpRequest();
    xhr.onload = () =>{
        console.log(xhr.status)
        console.log(xhr.response)
        callback(xhr.status, xhr.response)
    }
    xhr.open('PUT',url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(body))

}

export function saveToken(token) {
    sessionToken = token
    localStorage.setItem(sessionTokenString, token)
}

export function resetToken() {
    // clear token when users logs out
    sessionToken = undefined
    localStorage.setItem(sessionTokenString, undefined)

}

export function getTokenPayload() {
    sessionToken = localStorage.getItem('AUTHTOKEN')
    if(sessionToken == 'undefined'){
        return undefined
    }
    if (sessionToken) {
        // extract JSON payload from token string
        const gottenToken = localStorage.getItem(sessionTokenString)
        return JSON.parse(atob(gottenToken.split('.')[1]))
    }
    console.log("session token is undefined")
    return undefined
}

// utility functions adds/removes CSS class 'bad' upon validation
export function validateInputControl(element, ok) {
    if (ok) {
        element.classList.remove('bad')
    } else {
        element.classList.add('bad')
    }
}

export function createNavbar() {
    const navbar = document.querySelector('nav')
    const payload = getTokenPayload();
    if(!payload){
        const ahref_home = document.createElement('a')
        ahref_home.innerText = "Home"
        ahref_home.setAttribute('href', 'index.html')
        navbar.appendChild(ahref_home)
        const ahref_login = document.createElement('a')
        ahref_login.innerText = "Login"
        ahref_login.setAttribute('href', 'login.html')
        navbar.appendChild(ahref_login)
    }else {
        if (payload.roles.includes('user')) {
            const ahref_home = document.createElement('a')
            ahref_home.innerText = "Home"
            ahref_home.setAttribute('href', 'index.html')
            navbar.appendChild(ahref_home)
            const ahref_bids = document.createElement('a')
            ahref_bids.innerText = "My Bids"
            ahref_bids.setAttribute('href', 'bids.html')
            navbar.appendChild(ahref_bids)
            if (payload.roles.includes('admin')) {
                const ahref_admin = document.createElement('a')
                ahref_admin.innerText = "Administration"
                ahref_admin.setAttribute('href', 'administration.html')
                navbar.appendChild(ahref_admin)
            }
            const ahref_login = document.createElement('a')
            ahref_login.innerText = "Login"
            ahref_login.setAttribute('href', 'login.html')
            navbar.appendChild(ahref_login)
            const ahref_logout = document.createElement('a')
            ahref_logout.innerText = "Logout"
            ahref_logout.setAttribute('href', '/logout.html')
            navbar.appendChild(ahref_logout)

            const div_form = document.createElement('div')
            div_form.className = "search-container"
            const form = document.createElement('form')
            form.action = ""
            const form_input = document.createElement('input')
            form_input.type = "text"
            form_input.placeholder = "Search..."
            form_input.name = "search"
            const form_button = document.createElement('button')
            form_button.type = "submit"
            form_button.addEventListener('click', () =>{
                const searchField =  document.querySelector('input[type="text"]')
                const searchFieldValue = searchField.value
                console.log(`Searching for: ${searchFieldValue}`)
                getItemsSearch(searchFieldValue).then(foundItems =>{
                    alert(foundItems)
                })
            })
            const icon_search = document.createElement("i")
            icon_search.className = "fa fa-search"

            form_button.appendChild(icon_search)
            form.appendChild(form_input)
            form.appendChild(form_button)
            div_form.appendChild(form)

            navbar.appendChild(div_form)
        }
    }
}

export async function getItems() {
    const token = localStorage.getItem(sessionTokenString)
    const auctionUrl = 'http://localhost:8000/api/auctions'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer' + token
        }
    }
    let reponse = await fetch(auctionUrl,options)
    let data = await reponse.json();
    console.log("Data: " +data)
    return data
}

async function getItemsSearch(searchFieldValue) {
    const token = localStorage.getItem(sessionTokenString)
    const auctionUrl = `http://localhost:8000/api/auctions/search/${searchFieldValue}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer' + token
        }
    }
    let reponse = await fetch(auctionUrl,options)
    let data = await reponse.json();
    console.log("Data: " +data)
    return data
}



