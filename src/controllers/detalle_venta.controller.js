import { pool } from "../../db_connection.js";

// Obtener todos los detalles de ventas
export const obtenerDetalleVentas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM detalles_ventas");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Detalles de Ventas.",
      error,
    });
  }
};

// Obtener un detalle de venta por su ID
export const obtenerDetalleVenta = async (req, res) => {
  try {
    const { id_detalle_venta } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM detalles_ventas WHERE id_detalle_venta = ?",
      [id_detalle_venta]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_venta} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los detalles de ventas.",
      error,
    });
  }
};

// Registrar un nuevo Detalle de Venta
export const registrarDetalleVenta = async (req, res) => {
  try {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO detalles_ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
      [id_venta, id_producto, cantidad, precio_unitario]
    );
    res.status(201).json({ id_detalle_venta: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el detalle de venta.",
      error,
    });
  }
};

// Eliminar un detalle de venta por su ID
export const eliminarDetalleVenta = async (req, res) => {
  try {
    const { id_detalle_venta } = req.params;
    const [result] = await pool.query(
      "DELETE FROM detalles_ventas WHERE id_detalle_venta = ?",
      [id_detalle_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el detalle de venta. El ID ${id_detalle_venta} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el detalle de venta.",
      error,
    });
  }
};

// Actualizar parcialmente un detalle de venta (PATCH)
export const actualizarDetalleVentaPatch = async (req, res) => {
  try {
    const { id_detalle_venta } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE detalles_ventas SET ${campos} WHERE id_detalle_venta = ?`,
      [...valores, id_detalle_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Detalle de venta con ID ${id_detalle_venta} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Detalle de venta con ID ${id_detalle_venta} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el detalle de venta.",
      error,
    });
  }
};