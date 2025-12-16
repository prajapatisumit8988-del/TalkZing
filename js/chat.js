import { auth, database } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");

let userEmail = "";

onAuthStateChanged(auth, user => {
    if (!user) {
        window.location.href = "index.html";
    } else {
        userEmail = user.email.replace(".", "_");
        loadMessages();
    }
});

window.sendMessage = function() {
    const text = messageInput.value.trim();
    if (text === "") return;

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
        user: userEmail,
        message: text,
        time: Date.now()
    });

    messageInput.value = "";
}

function loadMessages() {
    const messagesRef = ref(database, "messages");
    onChildAdded(messagesRef, snapshot => {
        const data = snapshot.val();

        const div = document.createElement("div");
        div.classList.add("message");

        if (data.user === userEmail) {
            div.classList.add("sent");
        } else {
            div.classList.add("received");
        }

        div.innerHTML = `<strong>${data.user.replace("_", ".")}</strong><br>${data.message}`;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

window.logout = function() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
}
