import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDX2K-8zFXnniHKBHXq1L9EURF727QtLjY",
  authDomain: "talkzing-4364d.firebaseapp.com",
  databaseURL: "https://talkzing-4364d-default-rtdb.firebaseio.com",
  projectId: "talkzing-4364d",
  storageBucket: "talkzing-4364d.appspot.com",
  messagingSenderId: "880336069904",
  appId: "1:880336069904:web:e561d53cab028b8e857195"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
