import { pool } from "../../db_connection.js";

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM productos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Productos.",
      error,
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id_producto]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_producto} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los productos.",
      error,
    });
  }
};

// Registrar un nuevo Producto
export const registrarProducto = async (req, res) => {
  try {
    const { nombre_producto, descripcion_producto, precio, stock, id_categoria } = req.body;
    const [result] = await pool.query(
      "INSERT INTO productos (nombre_producto, descripcion_producto, precio, stock, id_categoria) VALUES (?, ?, ?, ?, ?)",
      [nombre_producto, descripcion_producto, precio, stock, id_categoria]
    );
    res.status(201).json({ id_producto: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el producto.",
      error,
    });
  }
};

// Eliminar un producto por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const [result] = await pool.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id_producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${id_producto} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el producto.",
      error,
    });
  }
};

// Actualizar parcialmente un producto (PATCH)
export const actualizarProductoPatch = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE productos SET ${campos} WHERE id_producto = ?`,
      [...valores, id_producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Producto con ID ${id_producto} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Producto con ID ${id_producto} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el producto.",
      error,
    });
  }
};