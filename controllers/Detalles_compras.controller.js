import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerDetalles_Compra = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM detalles_compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};

export const eliminarDetalleCompra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const [result] = await pool.query(
      'DELETE FROM Detalles_Compras WHERE id_detalle_compra = ?',
      [id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_detalle_compra} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la categoría.',
      error: error
    });
  }
};