import { pool } from "../../db_connection.js";

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer las Compras.",
      error,
    });
  }
};

// Obtener una compra por su ID
export const obtenerCompra = async (req, res) => {
  try {
    const { id_compra } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM compras WHERE id_compra = ?",
      [id_compra]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_compra} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las compras.",
      error,
    });
  }
};

// Registrar una nueva Compra
export const registrarCompra = async (req, res) => {
  try {
    const { id_proveedor, fecha_compra, total_compra } = req.body;
    const [result] = await pool.query(
      "INSERT INTO compras (id_proveedor, fecha_compra, total_compra) VALUES (?, ?, ?)",
      [id_proveedor, fecha_compra, total_compra]
    );
    res.status(201).json({ id_compra: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la compra.",
      error,
    });
  }
};

// Eliminar una compra por su ID
export const eliminarCompra = async (req, res) => {
  try {
    const { id_compra } = req.params;
    const [result] = await pool.query(
      "DELETE FROM compras WHERE id_compra = ?",
      [id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la compra. El ID ${id_compra} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar la compra.",
      error,
    });
  }
};

// Actualizar parcialmente una compra (PATCH)
export const actualizarCompraPatch = async (req, res) => {
  try {
    const { id_compra } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE compras SET ${campos} WHERE id_compra = ?`,
      [...valores, id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Compra con ID ${id_compra} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Compra con ID ${id_compra} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la compra.",
      error,
    });
  }
};