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
  const phoneNumber = phone.value;

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then(result => {
      confirmationResult = result;
      msg.innerText = "OTP sent successfully";
    })
    .catch(err => alert(err.message));
};

window.verifyOTP = function () {
  confirmationResult.confirm(otp.value).then(result => {
    const user = result.user;

    set(ref(database, "users/" + user.uid), {
      name: name.value,
      phone: user.phoneNumber
    });

    location.href = "chat.html";
  }).catch(() => alert("Invalid OTP"));
};
