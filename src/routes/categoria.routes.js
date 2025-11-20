import { Router } from 'express';
import { 
  obtenerCategorias, 
  obtenerCategoria, 
  registrarCategoria, 
  eliminarCategoria, 
  actualizarCategoriaPatch 
} from '../controllers/categorias.controller.js';

const router = Router();

// SIN /api AQUÍ → porque ya lo pusiste en app.js
router.get('/categorias', obtenerCategorias);
router.get('/categoria/:id_categoria', obtenerCategoria);
router.post('/registrarcategoria', registrarCategoria);
router.delete('/eliminarcategoria/:id_categoria', eliminarCategoria);
router.patch('/actualizarcategoriapatch/:id_categoria', actualizarCategoriaPatch);

export default router;