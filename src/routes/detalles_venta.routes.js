import { Router } from 'express';
import { actualizarDetalles_ventasPatch, eliminardetalles_ventas, obtenerDetallesVentas, obtenerDetalle_Venta, registrardetalles_ventas } from '../controllers/detalles_ventas.controller.js';

const router = Router();

// Ruta para obtener todos los detalles_ventas
router.get('/detalles_ventas', obtenerDetallesVentas);

// Ruta para obtener un detralles_ventas por su ID
router.get('/detalle_venta/:id_detalle_ventas', obtenerDetalle_Venta);

// Ruta para registrar una nueva detalle_venta
router.post('/registrardetalle_ventas',registrardetalles_ventas);

// Ruta para eliminar un detalle_venta por su ID
router.delete('/eliminardetalles_ventas/:id_detalle_venta', eliminardetalles_ventas);

// Ruta para actualizar una Detalle_Venta por su ID
router.patch('/actualizardetalles_ventaspatch/:id_detalle_venta', actualizarDetalles_ventasPatch);


export default router;