import { Router } from 'express';
import { actualizarDetalles_comprasPatch, eliminardetalles_compras, obtenerDetalle_Compra, obtenerDetallesCompras, registrardetalles_compras } from '../controllers/Detalles_compras.controller.js';

const router = Router();

// Ruta para obtener todos los detalles_compras
router.get('/Detalles_compras', obtenerDetallesCompras);

// Ruta para obtener una detalletes_compras por su ID
router.get('/Detalles_compras/:id_detalles_compras',obtenerDetalle_Compra);

// Ruta para registrar una nueva detalle_compra
router.post('/registrardetalle_comra',registrardetalles_compras);

// Ruta para eliminar un detalle_compra por su ID
router.delete('/eliminardetalles_compras/:id_detalle_compra', eliminardetalles_compras);

// Ruta para actualizar una Detalle_Compra por su ID
router.patch('/actualizardetalles_compraspatch/:id_detalle_compra', actualizarDetalles_comprasPatch);


export default router;