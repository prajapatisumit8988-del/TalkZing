import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const msg = document.getElementById("msg");

window.signup = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password) {
        msg.innerText = "Email aur Password bharo!";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => msg.innerText = "Signup successful! Login karo.")
    .catch(err => msg.innerText = err.message);
}

window.login = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "chat.html")
    .catch(err => msg.innerText = err.message);
}
