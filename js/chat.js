import { auth, database } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { ref, onValue, push, set } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

let currentUser = "";
let selectedUser = "";

onAuthStateChanged(auth, user => {
  if (!user) location.href = "index.html";
  currentUser = user.email.replace(".", "_");
  loadUsers();
});

function loadUsers() {
  onValue(ref(database, "users"), snap => {
    userList.innerHTML = "";
    snap.forEach(child => {
      if (child.key !== currentUser) {
        const div = document.createElement("div");
        div.innerText = child.val().email;
        div.onclick = () => openChat(child.key);
        userList.appendChild(div);
      }
    });
  });
}

function openChat(userId) {
  selectedUser = userId;
  chatBox.innerHTML = "";

  const chatId = [currentUser, selectedUser].sort().join("__");

  onValue(ref(database, "chats/" + chatId), snap => {
    chatBox.innerHTML = "";
    snap.forEach(msg => {
      const p = document.createElement("p");
      p.innerText = msg.val().text;
      chatBox.appendChild(p);
    });
  });
}

window.sendMessage = function () {
  if (!selectedUser) return alert("Select user first");

  const chatId = [currentUser, selectedUser].sort().join("__");

  push(ref(database, "chats/" + chatId), {
    from: currentUser,
    text: message.value,
    time: Date.now()
  });

  message.value = "";
};
