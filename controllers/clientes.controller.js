import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM clientes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const [result] = await pool.query(
      'DELETE FROM clientes WHERE id_cliente = ?',
      [id_cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_cliente} no fue encontrado.`
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