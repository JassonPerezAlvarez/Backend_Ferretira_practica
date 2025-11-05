import { Router } from 'express';
import { obtenerClientes, obtenerCliente, registrarCliente, eliminarCliente, actualizarClientePatch } from '../controllers/clientes.controller.js';

const router = Router();

// Obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Obtener un cliente por su ID
router.get('/cliente/:id_cliente', obtenerCliente);

// Ruta para registrar un nuevo cliente
router.post('/registrarcliente', registrarCliente);

// Eliminar un cliente por ID
router.delete('/eliminarCliente/:id_cliente', eliminarCliente);

// Actualizar parcialmente un cliente por su ID
router.patch('/actualizarCliente/:id_cliente', actualizarClientePatch);

export default router;