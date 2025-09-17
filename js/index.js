import { data } from "./data.js";

let cardsContainer = document.getElementById("cards-container");
let fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  data.forEach((menu) => {
    const { semana, descripcion, img } = menu;

    
    let nuevoE = document.createElement("div");

    nuevoE.classList.add("card");

   
    nuevoE.innerHTML = `
      <img src="${img}" alt="${semana}" />
      <h3>${semana}</h3>
      <p>${descripcion}</p>
    `;

    // Agregar la tarjeta al fragmento
    fragment.appendChild(nuevoE);
  });

  // Añadir todas las tarjetas al contenedor
  cardsContainer.appendChild(fragment);
});