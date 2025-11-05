import { pool } from "../../db_connection.js";

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM ventas");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer las Ventas.",
      error,
    });
  }
};

// Obtener una venta por su ID
export const obtenerVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM ventas WHERE id_venta = ?",
      [id_venta]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_venta} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las ventas.",
      error,
    });
  }
};

// Registrar una nueva Venta
export const registrarVenta = async (req, res) => {
  try {
    const { id_cliente, fecha_venta, total_venta } = req.body;
    const [result] = await pool.query(
      "INSERT INTO ventas (id_cliente, fecha_venta, total_venta) VALUES (?, ?, ?)",
      [id_cliente, fecha_venta, total_venta]
    );
    res.status(201).json({ id_venta: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la venta.",
      error,
    });
  }
};

// Eliminar una venta por su ID
export const eliminarVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const [result] = await pool.query(
      "DELETE FROM ventas WHERE id_venta = ?",
      [id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la venta. El ID ${id_venta} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar la venta.",
      error,
    });
  }
};

// Actualizar parcialmente una venta (PATCH)
export const actualizarVentaPatch = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE ventas SET ${campos} WHERE id_venta = ?`,
      [...valores, id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Venta con ID ${id_venta} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Venta con ID ${id_venta} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la venta.",
      error,
    });
  }
};