import { Router } from 'express';
import { obtenerDetallesCompras, obtenerDetalleCompra, registrarDetalleCompra, eliminarDetalleCompra, actualizarDetalleCompraPatch } from '../controllers/detalles_compras.controller.js';

const router = Router();

// Obtener todos los detalles de compras
router.get('/detallescompras', obtenerDetallesCompras);

// Obtener un detalle de compra por su ID
router.get('/detallecompra/:id_detalle_compra', obtenerDetalleCompra);

// Ruta para registrar un nuevo detalle de compra
router.post('/registrardetallecompra', registrarDetalleCompra);

// Eliminar un detalle de compra por ID
router.delete('/eliminardetalleCompra/:id_detalle_compra', eliminarDetalleCompra);

// Actualizar parcialmente un detalle de compra por su ID
router.patch('/actualizardetalleCompra/:id_detalle_compra', actualizarDetalleCompraPatch);

export default router;