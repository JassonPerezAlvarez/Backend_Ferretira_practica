import { pool } from '../../db_connection.js';
// Obtener todas los Usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Usuarios');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};

// Obtener una usuario por su ID
export const obtenerUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_usuario} no encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las usuarios.'
    });
  }
};

// Registrar una nueva Usuario
export const registrarUsuario = async (req, res) => {
  try {
    const {
      usuario,
      contraseña
    } = req.body;
    const [result] = await pool.query(
      'INSERT INTO usuarios (usuario,contraseña) VALUES (?, ?)',
      [usuario,
      contraseña]
    );
    res.status(201).json({ id_usuario: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la producto.',
      error: error
    });
  }
};

// Eliminar una usuario por su ID
export const eliminarUsuarios = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const [result] = await pool.query(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la usuario. El ID ${id_usuario} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la usuario.',
      error: error
    });
  }
};

// Actualizar una Usuario por id 
export const actualizarUsuarioPatch = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      'UPDATE Usuarios SET ? WHERE id_usuario = ?',
      [datos, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: ' Usuario con . ID ${id_usuario} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Uusario con ID ${id_usuario} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la usuario.',
      error: error
    });
  }
};




