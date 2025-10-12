const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "*" 
}));
app.use(express.json());

// Servir archivos estáticos
// Servir archivos estáticos
app.use("/img_perfil", express.static(path.join(__dirname, "img_perfil")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/html", express.static(path.join(__dirname, "html"))); 
app.use("/Img", express.static(path.join(__dirname, "Img")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "html/inicio.html"));
});

// Conexión a MySQL (usa variables del entorno)
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "lets_eat",
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false, // Aiven requiere SSL
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL (Aiven)");
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
  const query = "SELECT nombre, Foto FROM usuarios WHERE usuario = ?";

  db.query(query, [usuario], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error del servidor" });
    }

    if (results.length > 0) {
      const datos = {
        nombre: results[0].nombre,
        foto: results[0].Foto ? results[0].Foto : "img_perfil/default.png",
      };
      res.json({ success: true, datos });
    } else {
      res.json({ success: false, message: "Usuario no encontrado" });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "inicio.html"));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});