import { pool } from "../../db_connection.js";

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM categorias");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer las Categorías.",
      error,
    });
  }
};

// Obtener una categoría por su ID
export const obtenerCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM categorias WHERE id_categoria = ?",
      [id_categoria]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_categoria} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorías.",
      error,
    });
  }
};

// Registrar una nueva Categoría
export const registrarCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion_categoria } = req.body;
    const [result] = await pool.query(
      "INSERT INTO categorias (nombre_categoria, descripcion_categoria) VALUES (?, ?)",
      [nombre_categoria, descripcion_categoria]
    );
    res.status(201).json({ id_categoria: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error,
    });
  }
};

// Eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const [result] = await pool.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id_categoria]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_categoria} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar la categoría.",
      error,
    });
  }
};

// Actualizar parcialmente una categoría (PATCH)
export const actualizarCategoriaPatch = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE categorias SET ${campos} WHERE id_categoria = ?`,
      [...valores, id_categoria]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Categoría con ID ${id_categoria} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Categoría con ID ${id_categoria} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la categoría.",
      error,
    });
  }
};