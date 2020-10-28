import {resetToken} from './util.js'

window.addEventListener('DOMContentLoaded', () => {
    resetToken();
    console.log("Resetted token")
    window.location.pathname = "/"
})