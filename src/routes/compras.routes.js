import { Router } from 'express';
import { actualizarCompraPatch, eliminarCompra, obtenerCompra,obtenerCompras, registrarCompra } from '../controllers/compra.controller.js';

const router = Router();

// Ruta para obtener todos los compras
router.get('/compra', obtenerCompras);

// Ruta para obtener una compra por su ID
router.get('/compra/:id_compra',obtenerCompra);

// Ruta para registrar una nueva compra
router.post('/registrarcompra',registrarCompra);

// Ruta para eliminar un compra por su ID
router.delete('/eliminarcompra/:id_compra', eliminarCompra);

// Ruta para actualizar una Compra por su ID
router.patch('/actualizarcomprapatch/:id_compra', actualizarCompraPatch);

export default router;