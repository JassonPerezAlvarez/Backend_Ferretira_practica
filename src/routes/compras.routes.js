import { Router } from 'express';
import { obtenerCompras, obtenerCompra, registrarCompra, eliminarCompra, actualizarCompraPatch } from '../controllers/compras.controller.js';
const router = Router();

// Obtener todas las compras
router.get('/compras', obtenerCompras);

// Obtener una compra por su ID
router.get('/compra/:id_compra', obtenerCompra);

// Ruta para registrar una nueva compra
router.post('/registrarcompra', registrarCompra);

// Eliminar una compra por ID
router.delete('/eliminarCompra/:id_compra', eliminarCompra);

// Actualizar parcialmente una compra por su ID
router.patch('/actualizarCompra/:id_compra', actualizarCompraPatch);

export default router;