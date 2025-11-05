import { Router } from 'express';
import { obtenerProductos, obtenerProducto, registrarProducto, eliminarProducto, actualizarProductoPatch } from '../controllers/productos.controller.js';

const router = Router();

// Obtener todos los productos
router.get('/productos', obtenerProductos);

// Obtener un producto por su ID
router.get('/producto/:id_producto', obtenerProducto);

// Ruta para registrar un nuevo producto
router.post('/registrarproducto', registrarProducto);

// Eliminar un producto por ID
router.delete('/eliminarProducto/:id_producto', eliminarProducto);

// Actualizar parcialmente un producto por su ID
router.patch('/actualizarProducto/:id_producto', actualizarProductoPatch);

export default router;