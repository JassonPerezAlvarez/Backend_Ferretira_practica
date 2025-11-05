import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleado, registrarEmpleado, eliminarEmpleado, actualizarEmpleadoPatch } from '../controllers/empleados.controller.js';

const router = Router();

// Obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Obtener un empleado por su ID
router.get('/empleado/:id_empleado', obtenerEmpleado);

// Ruta para registrar un nuevo empleado
router.post('/registrarempleado', registrarEmpleado);

// Eliminar un empleado por ID
router.delete('/eliminarempleado/:id_empleado', eliminarEmpleado);

// Actualizar parcialmente un empleado por su ID
router.patch('/actualizarempleado/:id_empleado', actualizarEmpleadoPatch);

export default router;