import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerVentas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM ventas");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};


export const eliminarVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const [result] = await pool.query(
      'DELETE FROM ventas WHERE id_venta = ?',
      [id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_venta} no fue encontrado.`
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