import { pool } from "../../db_connection.js";

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM clientes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Clientes.",
      error,
    });
  }
};

// Obtener un cliente por su ID
export const obtenerCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM clientes WHERE id_cliente = ?",
      [id_cliente]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_cliente} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los clientes.",
      error,
    });
  }
};

// Registrar un nuevo Cliente
export const registrarCliente = async (req, res) => {
  try {
    const { nombre_cliente, apellido_cliente, direccion_cliente, telefono_cliente, email_cliente } = req.body;
    const [result] = await pool.query(
      "INSERT INTO clientes (nombre_cliente, apellido_cliente, direccion_cliente, telefono_cliente, email_cliente) VALUES (?, ?, ?, ?, ?)",
      [nombre_cliente, apellido_cliente, direccion_cliente, telefono_cliente, email_cliente]
    );
    res.status(201).json({ id_cliente: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el cliente.",
      error,
    });
  }
};

// Eliminar un cliente por su ID
export const eliminarCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const [result] = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [id_cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el cliente. El ID ${id_cliente} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el cliente.",
      error,
    });
  }
};

// Actualizar parcialmente un cliente (PATCH)
export const actualizarClientePatch = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE clientes SET ${campos} WHERE id_cliente = ?`,
      [...valores, id_cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Cliente con ID ${id_cliente} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Cliente con ID ${id_cliente} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el cliente.",
      error,
    });
  }
};