import { pool } from "../../db_connection.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Usuarios.",
      error,
    });
  }
};

// Obtener un usuario por su ID
export const obtenerUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id_usuario]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_usuario} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los usuarios.",
      error,
    });
  }
};

// Registrar un nuevo Usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { username, password, rol, id_empleado } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios (username, password, rol, id_empleado) VALUES (?, ?, ?, ?)",
      [username, password, rol, id_empleado]
    );
    res.status(201).json({ id_usuario: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el usuario.",
      error,
    });
  }
};

// Eliminar un usuario por su ID
export const eliminarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el usuario. El ID ${id_usuario} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el usuario.",
      error,
    });
  }
};

// Actualizar parcialmente un usuario (PATCH)
export const actualizarUsuarioPatch = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE usuarios SET ${campos} WHERE id_usuario = ?`,
      [...valores, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Usuario con ID ${id_usuario} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Usuario con ID ${id_usuario} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el usuario.",
      error,
    });
  }
};