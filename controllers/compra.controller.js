import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};


export const eliminarCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query(
      'DELETE FROM compras WHERE id_compra = ?',
      [id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_compra} no fue encontrado.`
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
