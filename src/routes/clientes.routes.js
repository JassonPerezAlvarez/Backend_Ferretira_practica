import { Router } from 'express';
import { actualizarClientePatch, eliminarCliente, obtenerCliente, obtenerClientes, registrarCliente } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener una cliente por su ID
router.get('/cliente/:id_cliente',obtenerCliente);

// Ruta para registrar un nuevo cliente
router.post('/registrarcliente',registrarCliente);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcliente/:id_cliente', eliminarCliente);

// Ruta para actualizar una Cliente  por su ID
router.patch('/actualizarclientepatch/:id_cliente', actualizarClientePatch);

export default router;