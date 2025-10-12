fetch("https://lets-eat-ezzn.onrender.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    usuario: usuario,
    contrasena: contrasena,
    tipo_usuario: tipoUsuario,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      localStorage.setItem("usuario", usuario);
      window.location.href = "perfil.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  })
  .catch((error) => {
    console.error("Error al iniciar sesión:", error);
    alert("Hubo un error al conectar con el servidor");
  });
