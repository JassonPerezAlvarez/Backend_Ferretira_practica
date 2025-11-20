import { Router } from 'express';
import { actualizarEmpleadoPatch, eliminarEmpleado, obtenerEmpleados, obtenerEmpleado, registrarEmpleado } from '../controllers/empleado.controller.js';

const router = Router();

// Obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Obtener empleado por ID
router.get('/empleados/:id_empleado', obtenerEmpleado);

// Registrar empleado
router.post('/empleados', registrarEmpleado);

// Eliminar empleado
router.delete('/empleados/:id_empleado', eliminarEmpleado);

// Actualizar empleado
router.patch('/empleados/:id_empleado', actualizarEmpleadoPatch);

export default router;
