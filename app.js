// Exemplo: conectar ao Firebase Realtime Database
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Escuta mudanças em tempo real
onValue(ref(db, 'dados'), (snapshot) => {
  console.log(snapshot.val());
});