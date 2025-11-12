const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use("/img_perfil", express.static(path.join(__dirname, "img_perfil")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/html", express.static(path.join(__dirname, "html"))); // HTML en carpeta html

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lets_eat",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL (lets_eat)");
});

// Ruta de login
app.post("/login", (req, res) => {
  const { usuario, contrasena, tipo_usuario } = req.body;
  const query =
    "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ? AND tipo = ?";

  db.query(query, [usuario, contrasena, tipo_usuario], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error del servidor" });
    }

    if (results.length > 0) {
      const nombre = results[0].nombre;
      console.log("Login recibido:", { usuario, contrasena, tipo_usuario, nombre });
      res.json({ success: true, usuario });
    } else {
      res.json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
  });
});

// Ruta para obtener datos del usuario
app.post("/obtener-datos-usuario", (req, res) => {
  const { usuario } = req.body;
  const query = "SELECT nombre, foto FROM usuarios WHERE usuario = ?";

  console.log("Datos recibidos en /login:", req.body);

  db.query(query, [usuario], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error del servidor" });
    }

    if (results.length > 0) {
      // Si no hay foto, asignar default.png
      const datos = {
        nombre: results[0].nombre,
        foto: results[0].foto ? results[0].foto : "img_perfil/default.png",
      };
      res.json({ success: true, datos });
    } else {
      res.json({ success: false, message: "Usuario no encontrado" });
    }
  });
});

// Obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
    res.json(results);
  });
});

// Actualizar un usuario
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { usuario, contrasena, tipo, nombre, Foto } = req.body;
  const query =
    "UPDATE usuarios SET usuario = ?, contrasena = ?, tipo = ?, nombre = ?, Foto = ? WHERE id = ?";
  db.query(query, [usuario, contrasena, tipo, nombre, Foto, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }
    res.json({ success: true, message: "Usuario actualizado correctamente" });
  });
});

// Eliminar un usuario
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM usuarios WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
    res.json({ success: true, message: "Usuario eliminado correctamente" });
  });
});



// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});