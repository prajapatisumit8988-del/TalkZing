import { getAuth, onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase, ref, set, push,
  onChildAdded, onValue, onDisconnect
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getDatabase(app);

const chatBox = document.getElementById("chatBox");
const userList = document.getElementById("userList");
const chatTitle = document.getElementById("chatTitle");

let currentUser = "";
let selectedUser = "";
let chatId = "";

/* LOGIN CHECK */
onAuthStateChanged(auth, user => {
  if (!user) {
    location.href = "index.html";
  } else {
    currentUser = user.email.replace(/\./g, "_");

    set(ref(db, "users/" + currentUser), {
      email: user.email,
      online: true
    });

    onDisconnect(ref(db, "users/" + currentUser + "/online")).set(false);

    loadUsers();
  }
});

/* LOAD USERS */
function loadUsers() {
  onChildAdded(ref(db, "users"), snap => {
    const uid = snap.key;
    if (uid === currentUser) return;

    const div = document.createElement("div");
    div.className = "user";

    const dot = document.createElement("span");
    dot.className = "status offline";

    const name = document.createElement("span");
    name.innerText = uid;

    div.appendChild(dot);
    div.appendChild(name);
    userList.appendChild(div);

    onValue(ref(db, "users/" + uid + "/online"), s => {
      dot.className = "status " + (s.val() ? "online" : "offline");
    });

    div.onclick = () => selectUser(uid);
  });
}

/* SELECT USER */
function selectUser(uid) {
  selectedUser = uid;
  chatBox.innerHTML = "";

  chatId = [currentUser, selectedUser].sort().join("__");
  chatTitle.innerText = "💬 Chat with " + selectedUser;

  onChildAdded(ref(db, "chats/" + chatId), snap => {
    const msg = snap.val();
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(msg.from === currentUser ? "sent" : "received");
    div.innerText = msg.text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

/* SEND MESSAGE */
window.sendMessage = function () {
  if (!selectedUser) {
    alert("Select a user");
    return;
  }

  const text = document.getElementById("message").value;
  if (text === "") return;

  push(ref(db, "chats/" + chatId), {
    from: currentUser,
    text,
    time: Date.now()
  });

  document.getElementById("message").value = "";
};

/* LOGOUT */
window.logout = function () {
  set(ref(db, "users/" + currentUser + "/online"), false);
  signOut(auth).then(() => location.href = "index.html");
};
