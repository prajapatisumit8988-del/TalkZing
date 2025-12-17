import { auth, database, RecaptchaVerifier } from "./firebase.js";
import { signInWithPhoneNumber } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { ref, set } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

window.recaptchaVerifier = new RecaptchaVerifier(
  'recaptcha',
  { size: 'normal' },
  auth
);

let confirmationResult;

window.sendOTP = function () {
  const phone = phone.value;
  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then(result => {
      confirmationResult = result;
      msg.innerText = "OTP sent!";
    })
    .catch(err => alert(err.message));
};

window.verifyOTP = function () {
  const code = otp.value;
  confirmationResult.confirm(code).then(result => {
    const user = result.user;
    const uid = user.uid;

    set(ref(database, "users/" + uid), {
      name: name.value,
      phone: user.phoneNumber
    });

    location.href = "chat.html";
  });
};
