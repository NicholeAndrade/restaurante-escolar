document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector("#tablaUsuarios tbody");
  const modal = document.getElementById("modalEditar");
  const cancelarBtn = document.getElementById("cancelar");
  const formEditar = document.getElementById("formEditar");

  // Cargar usuarios
  fetch("usuarios")
    .then(res => res.json())
    .then(data => {
      tablaBody.innerHTML = "";
      data.forEach(u => {
        tablaBody.innerHTML += `
          <tr>
            <td>${u.id}</td>
            <td>${u.usuario}</td>
            <td>${u.contrasena}</td>
            <td>${u.tipo}</td>
            <td>${u.nombre}</td>
            <td>${u.Foto}</td>
            <td>
              <button class="editar" data-id="${u.id}">Editar</button>
              <button class="eliminar" data-id="${u.id}">Eliminar</button>
            </td>
          </tr>`;
      });
    })
    .catch(err => console.error("Error al cargar usuarios:", err));

  // Abrir modal para editar
  document.addEventListener("click", e => {
    if (e.target.classList.contains("editar")) {
      const fila = e.target.closest("tr");
      document.getElementById("editId").value = fila.children[0].textContent;
      document.getElementById("editUsuario").value = fila.children[1].textContent;
      document.getElementById("editContrasena").value = fila.children[2].textContent;
      document.getElementById("editTipo").value = fila.children[3].textContent;
      document.getElementById("editNombre").value = fila.children[4].textContent;
      document.getElementById("editFoto").value = fila.children[5].textContent;
      modal.style.display = "flex";
    }

    // Eliminar usuario
    if (e.target.classList.contains("eliminar")) {
      const id = e.target.dataset.id;
      if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        fetch(`/usuarios/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => location.reload());
      }
    }
  });

  // Cerrar modal
  cancelarBtn.onclick = () => modal.style.display = "none";

  // Guardar cambios
  formEditar.onsubmit = e => {
    e.preventDefault();
    const datos = {
      usuario: editUsuario.value,
      contrasena: editContrasena.value,
      tipo: editTipo.value,
      nombre: editNombre.value,
      Foto: editFoto.value
    };
    fetch(`/usuarios/${editId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(() => location.reload());
  };
});
