import { pool } from '../../db_connection.js';
// Obtener todas las Productos
export const obtenerProductos= async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Productos');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};

// Obtener una producto por su ID
export const obtenerProducto = async (req, res) => {
    try {
        const id_producto = req.params.id_producto;
        const [result] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id_producto]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. ID ${req.params.id_producto} no encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las productos.'
        });
    }
};

// Registrar una nueva Producto
export const registrarProducto = async (req, res) => {
    try {
        const { 
    nombre_producto,
    descripcion_producto,
    id_categoria,
    precio_unitario,
    stock,
    imagen
 } = req.body;
        const [result] = await pool.query(
            'INSERT INTO empleado (  nombre_producto,descripcion_producto,id_categoria,,stock,imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [  nombre_producto,
    descripcion_producto,
    id_categoria,
    precio_unitario,
    stock,
    imagen]
        );
        res.status(201).json({ id_producto: result.insertId });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al registrar la producto.',
            error: error
        });
    }
};

// Eliminar una producto por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const [result] = await pool.query(
      'DELETE FROM productos WHERE id_producto = ?',
      [id_producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la producto. El ID ${id_producto} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la producto.',
      error: error
    });
  }
};

// Actualizar una Producto por id 
export const actualizarProductoPatch = async (req, res) => {
  try {
    const {id_producto} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Productos SET ? WHERE id_producto = ?',
      [datos,  id_producto ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Producto con . ID ${id_producto} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Producto con ID ${id_producto} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la producto.',
      error: error
    });
  }
};
