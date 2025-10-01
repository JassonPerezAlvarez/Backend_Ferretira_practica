
// Eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;
    const [result] = await pool.query(
      'DELETE FROM categorias WHERE id_categoria = ?',
      [id_categoria]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_categoria} no fue encontrado.`
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