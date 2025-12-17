import { auth, database } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { ref, set } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

window.signup = function () {
  const emailVal = email.value;
  const passVal = password.value;

  createUserWithEmailAndPassword(auth, emailVal, passVal)
    .then((cred) => {
      const uid = cred.user.uid;

      set(ref(database, "users/" + uid), {
        email: emailVal
      });

      location.href = "chat.html";
    })
    .catch(err => alert(err.message));
};

window.login = function () {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location.href = "chat.html")
    .catch(err => alert(err.message));
};
