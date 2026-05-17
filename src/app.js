import { db } from './firebase-config.js';
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const lista = document.getElementById('lista');

// ESCUTA EM TEMPO REAL
onValue(ref(db, 'habitos'), (snapshot) => {
  const dados = snapshot.val() || {};
  lista.innerHTML = '';

  Object.entries(dados).forEach(([nome, info]) => {
    lista.innerHTML += `<p>${nome}: ${info.feito ? '✅' : '⬜'}</p>`;
  });
});