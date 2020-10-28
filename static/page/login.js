// import utilities from util.js
import { sendJSON, saveToken, validateInputControl } from './util.js'
import {createNavbar} from "./util.js";

// grab form controls from the DOM
const
    form = document.querySelector('main form'),
    usernameField = form.querySelector('input[type="text"]'),
    passwordField = form.querySelector('input[type="password"]'),
    loginButton = form.querySelector('input[type="submit"]')

window.addEventListener("DOMContentLoaded", () => {
    createNavbar()
});
// respond to click event on login button
loginButton.addEventListener('click', event => {
    // do not submit form (the default action of a submit button)
    event.preventDefault()
    // construct request body with username and password
    const body = { user: usernameField.value, password: passwordField.value }
    // send PUT request with body to /credentials and wait for HTTP response
    sendJSON({ method: 'PUT', url: '/credentials', body }, (err, response) => {
        // if err is undefined, the send operation was a success
        if (!err) {
            // store token from response body if login is a success
            console.log("in the none error function.")
            saveToken(response.token)
            console.log("Saved token")
            window.location.pathname = '/index.html'
            console.log("Redirected")
        } else {
            alert('Invalid username or password! \n Error:' + err )
            console.error(err)
        }
    })
})

// validate login form
function validateForm() {
    const
        usernameOk = usernameField.value.length > 0,
        passwordOk = passwordField.value.length > 0,
        loginOk = usernameOk && passwordOk
    // provide visual feedback for controls in a 'bad' state
    validateInputControl(usernameField, usernameOk)
    validateInputControl(passwordField, passwordOk)
    validateInputControl(loginButton, loginOk)
    // enable/disable click of login button
    loginButton.disabled = !loginOk
}

// validate form on every input event
form.addEventListener('input', validateForm)

// validate form on page load
validateForm()
