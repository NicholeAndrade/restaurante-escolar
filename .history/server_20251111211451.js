// --- Rutas para el panel del Administrador ---

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

// Actualizar usuario por ID
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { usuario, contrasena, tipo, nombre, foto } = req.body;

  const query =
    "UPDATE usuarios SET usuario = ?, contrasena = ?, tipo = ?, nombre = ?, foto = ? WHERE id = ?";

  db.query(query, [usuario, contrasena, tipo, nombre, foto, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }
    res.json({ message: "Usuario actualizado correctamente" });
  });
});

// Eliminar usuario por ID
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM usuarios WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  });
});
