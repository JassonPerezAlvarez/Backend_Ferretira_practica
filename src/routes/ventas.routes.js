import { Router } from 'express';
import { obtenerVentas, obtenerVenta, registrarVenta, eliminarVenta, actualizarVentaPatch } from '../controllers/ventas.controller.js';

const router = Router();

// Obtener todas las ventas
router.get('/ventas', obtenerVentas);

// Obtener una venta por su ID
router.get('/venta/:id_venta', obtenerVenta);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);

// Eliminar una venta por ID
router.delete('/eliminarVenta/:id_venta', eliminarVenta);

// Actualizar parcialmente una venta por su ID
router.patch('/actualizarVenta/:id_venta', actualizarVentaPatch);

export default router;