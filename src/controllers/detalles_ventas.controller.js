import { pool } from '../../db_connection.js';
// Obtener todas las Detalles_Compras
export const obtenerDetallesCompras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Detalles_Compras');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};

// Obtener una detalles_compras por su ID
export const obtenerDetalle_Compra = async (req, res) => {
    try {
        const id_detalles_compras = req.params.id_detalles_compras;
        const [result] = await pool.query('SELECT * FROM detalles_compras WHERE id_detalles_compras = ?', [req.params.id_detalles_compras]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. ID ${req.params.id_detalles_compras} no encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las detalles_compras.'
        });
    }
};

// Registrar una nueva detalles_compras
export const registrardetalles_compras = async (req, res) => {
    try {
        const {   id_compra,
    id_producto,
    cantidad,
    precio_unitario
 } = req.body;
        const [result] = await pool.query(
            'INSERT INTO detalle_compra ( id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
            [  id_compra,
    id_producto,
    cantidad,
    precio_unitario]
        );
        res.status(201).json({ id_detalle_compra: result.insertId });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al registrar la detalle_compra.',
            error: error
        });
    }
};

// Eliminar una detalles_compra por su ID
export const eliminardetalles_compras = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const [result] = await pool.query(
      'DELETE FROM detalles_compras WHERE id_detalle_compra = ?',
      [id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la detalles_compras. El ID ${id_detalle_compra} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la detalle_compra.',
      error: error
    });
  }
};

// Actualizar una Detalles_Compra por id 
export const actualizarDetalles_comprasPatch = async (req, res) => {
  try {
    const {id_detalle_compra} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Detalles_Compras SET ? WHERE id_detalle_compra = ?',
      [datos,  id_detalle_compra ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Detalles_Compras con . ID ${id_detalle_compra} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: ' detalle_compra con ID ${id_detalle_compra} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la Detalles_Compras.',
      error: error
    });
  }
};