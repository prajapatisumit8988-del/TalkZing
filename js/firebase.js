import { initializeApp } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, RecaptchaVerifier } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase } from
"https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDX2K-8zFXnniHKBHXq1L9EURF727QtLjY",
  authDomain: "talkzing-4364d.firebaseapp.com",
  databaseURL: "https://talkzing-4364d-default-rtdb.firebaseio.com",
  projectId: "talkzing-4364d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export { RecaptchaVerifier };
