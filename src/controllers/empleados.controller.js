import { pool } from "../../db_connection.js";

// Obtener todos los empleados
export const obtenerEmpleados = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM empleados");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Empleados.",
      error,
    });
  }
};

// Obtener un empleado por su ID
export const obtenerEmpleado = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM empleados WHERE id_empleado = ?",
      [id_empleado]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_empleado} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los empleados.",
      error,
    });
  }
};

// Registrar un nuevo Empleado
export const registrarEmpleado = async (req, res) => {
  try {
    const { nombre_empleado, apellido_empleado, cargo, salario, fecha_contratacion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO empleados (nombre_empleado, apellido_empleado, cargo, salario, fecha_contratacion) VALUES (?, ?, ?, ?, ?)",
      [nombre_empleado, apellido_empleado, cargo, salario, fecha_contratacion]
    );
    res.status(201).json({ id_empleado: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el empleado.",
      error,
    });
  }
};

// Eliminar un empleado por su ID
export const eliminarEmpleado = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const [result] = await pool.query(
      "DELETE FROM empleados WHERE id_empleado = ?",
      [id_empleado]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el empleado. El ID ${id_empleado} no fue encontrado.`,
      });
    }

    res.status(204).send(); // 204: No Content
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el empleado.",
      error,
    });
  }
};

// Actualizar parcialmente un empleado (PATCH)
export const actualizarEmpleadoPatch = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const datos = req.body;

    // Generar dinámicamente el SET
    const campos = Object.keys(datos)
      .map((campo) => `${campo} = ?`)
      .join(", ");
    const valores = Object.values(datos);

    const [result] = await pool.query(
      `UPDATE empleados SET ${campos} WHERE id_empleado = ?`,
      [...valores, id_empleado]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Empleado con ID ${id_empleado} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Empleado con ID ${id_empleado} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el empleado.",
      error,
    });
  }
};