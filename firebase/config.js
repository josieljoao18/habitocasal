import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",
  // ... resto da config
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);