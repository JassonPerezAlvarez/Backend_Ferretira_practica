import { Router } from 'express';
import { obtenerDetalleVentas, obtenerDetalleVenta, registrarDetalleVenta, eliminarDetalleVenta, actualizarDetalleVentaPatch } from '../controllers/detalle_venta.controller.js';

const router = Router();

// Obtener todos los detalles de ventas
router.get('/detalleventas', obtenerDetalleVentas);

// Obtener un detalle de venta por su ID
router.get('/detalleventa/:id_detalle_venta', obtenerDetalleVenta);

// Ruta para registrar un nuevo detalle de venta
router.post('/registrardetalleventa', registrarDetalleVenta);

// Eliminar un detalle de venta por ID
router.delete('/eliminardetalleVenta/:id_detalle_venta', eliminarDetalleVenta);

// Actualizar parcialmente un detalle de venta por su ID
router.patch('/actualizardetalleVenta/:id_detalle_venta', actualizarDetalleVentaPatch);

export default router;