import { Router } from 'express';
import { obtenerCategorias, obtenerCategoria, registrarCategoria, eliminarCategoria, actualizarCategoriaPatch } from '../controllers/categorias.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/categorias', obtenerCategorias);

// Obtener una categoría por su ID
router.get('/categoria/:id_categoria', obtenerCategoria);

// Ruta para registrar una nueva categoría
router.post('/registrarcategoria', registrarCategoria);

// Eliminar una categoría por ID
router.delete('/eliminarCategoria/:id_categoria', eliminarCategoria);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizarCategoria/:id_categoria', actualizarCategoriaPatch);

export default router;