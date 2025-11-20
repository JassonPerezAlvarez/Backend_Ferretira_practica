import { pool } from '../../db_connection.js';
// Obtener todas las Clientes
export const obtenerClientes = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Clientes');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};

// Obtener una cliente por su ID
export const obtenerCliente = async (req, res) => {
    try {
        const id_cliente = req.params.id_cliente;
        const [result] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id_cliente]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. ID ${req.params.id_cliente} no encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las clientes.'
        });
    }
};

// Registrar una nueva Cliente
export const registrarCliente = async (req, res) => {
    try {
        const { primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            celular,
            direccion,
            cedula
        } = req.body;
        const [result] = await pool.query(
            'INSERT INTO clientes (primer_nombre, segundo_nombre,  primer_apellido,  segundo_apellido,celular, direccion,cedula) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [primer_nombre,
                segundo_nombre,
                primer_apellido,
                segundo_apellido,
                celular,
                direccion,
                cedula]
        );
        res.status(201).json({ id_cliente: result.insertId });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al registrar la cliente.',
            error: error
        });
    }
};

// Eliminar una cliente por su ID
export const eliminarCliente = async (req, res) => {
    try {
        const id_cliente = req.params.id_cliente;
        const [result] = await pool.query(
            'DELETE FROM clientes WHERE id_cliente = ?',
            [id_cliente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: `Error al eliminar la cliente. El ID ${id_cliente} no fue encontrado.`
            });
        }

        // Respuesta sin contenido para indicar éxito
        res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al eliminar la cliente.',
            error: error
        });
    }
};

// Actualizar una Cliente por id 
export const actualizarClientePatch = async (req, res) => {
  try {
    const {id_cliente} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Clientes SET ? WHERE id_cliente = ?',
      [datos,  id_cliente ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Cliente con . ID ${id_cliente} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'cliente con ID ${id_cliente} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la Cliente.',
      error: error
    });
  }
};