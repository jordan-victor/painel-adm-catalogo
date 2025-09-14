// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZXLLhW_JsLwvomXSsMxxNvEM8oMNqCnc",
  authDomain: "painel-adm-catalogo-a17c8.firebaseapp.com",
  databaseURL: "https://painel-adm-catalogo-a17c8-default-rtdb.firebaseio.com",
  projectId: "painel-adm-catalogo-a17c8",
  storageBucket: "painel-adm-catalogo-a17c8.firebasestorage.app",
  messagingSenderId: "607666953541",
  appId: "1:607666953541:web:4279a3cde178b96425b22c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// exporta funções e db
export { db, ref, push, set };