import { Router } from 'express';
import { actualizarUsuarioPatch, eliminarUsuarios, obtenerUsuarios,obtenerUsuario, registrarUsuario } from '../controllers/usuario.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/usuarios', obtenerUsuarios);

// Ruta para obtener una usuario por su ID
router.get('/usuario/:id_usuario',obtenerUsuario);

// Ruta para registrar una nueva usuarios
router.post('/registrarusuario',registrarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete('/eliminarusuario/:id_usuario', eliminarUsuarios);

// Ruta para actualizar una Usuarios por su ID
router.patch('/actualizarusuariopatch/:id_usuario', actualizarUsuarioPatch);

export default router;