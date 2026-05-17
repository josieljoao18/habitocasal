import {
  db,
  collection,
  addDoc,
  onSnapshot
} from "./firebase.js";

const habitsRef = collection(db, "habits");

const lista = document.getElementById("lista");

const botao = document.getElementById("salvar");

const input = document.getElementById("habit");

// SALVAR HÁBITO
botao.addEventListener("click", async () => {

  if (input.value === "") return;

  await addDoc(habitsRef, {
    nome: input.value,
    criadoEm: new Date()
  });

  input.value = "";
});

// TEMPO REAL
onSnapshot(habitsRef, (snapshot) => {

  lista.innerHTML = "";

  snapshot.forEach((doc) => {

    const item = document.createElement("li");

    item.textContent = doc.data().nome;

    lista.appendChild(item);

  });

});