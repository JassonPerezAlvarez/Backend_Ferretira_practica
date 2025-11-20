import { pool } from '../../db_connection.js';

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM categorias');
        res.json(result);
    } catch (error) {
        console.error('Error en obtenerCategorias:', error);
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error.message
        });
    }
};

// Obtener una categoría por su ID
export const obtenerCategoria = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [req.params.id_categoria]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Categoría con ID ${req.params.id_categoria} no encontrada.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        console.error('Error en obtenerCategoria:', error);
        return res.status(500).json({
            mensaje: 'Error al obtener la categoría.'
        });
    }
};

// Registrar una nueva Categoría
export const registrarCategoria = async (req, res) => {
    try {
        const { nombre_categoria, descripcion_categoria } = req.body;
        const [result] = await pool.query(
            'INSERT INTO categorias (nombre_categoria, descripcion_categoria) VALUES (?, ?)',
            [nombre_categoria, descripcion_categoria]
        );
        res.status(201).json({ id_categoria: result.insertId });
    } catch (error) {
        console.error('Error en registrarCategoria:', error);
        return res.status(500).json({
            mensaje: 'Error al registrar la categoría.',
            error: error.message
        });
    }
};

// Eliminar una categoria por su ID
export const eliminarCategoria = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM categorias WHERE id_categoria = ?',
            [req.params.id_categoria]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: `Categoría con ID ${req.params.id_categoria} no encontrada.`
            });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error en eliminarCategoria:', error);
        return res.status(500).json({
            mensaje: 'Error al eliminar la categoría.',
            error: error.message
        });
    }
};

// Actualizar una Categoria por id 
export const actualizarCategoriaPatch = async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const datos = req.body;

        const [result] = await pool.query(
            'UPDATE categorias SET ? WHERE id_categoria = ?',  // AQUÍ ESTABA EL ERROR: "Categorias" → "categorias"
            [datos, id_categoria]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: `Categoría con ID ${id_categoria} no encontrada.`
            });
        }

        res.json({
            mensaje: `Categoría con ID ${id_categoria} actualizada correctamente.`
        });
    } catch (error) {
        console.error('Error en actualizarCategoriaPatch:', error);
        return res.status(500).json({
            mensaje: 'Error al actualizar la categoría.',
            error: error.message
        });
    }
};