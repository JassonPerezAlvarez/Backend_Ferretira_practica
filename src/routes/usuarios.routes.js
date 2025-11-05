import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, registrarUsuario, eliminarUsuario, actualizarUsuarioPatch } from '../controllers/usuarios.controller.js';

const router = Router();

// Obtener todos los usuarios
router.get('/usuarios', obtenerUsuarios);

// Obtener un usuario por su ID
router.get('/usuario/:id_usuario', obtenerUsuario);

// Ruta para registrar un nuevo usuario
router.post('/registrarusuario', registrarUsuario);

// Eliminar un usuario por ID
router.delete('/eliminarUsuario/:id_usuario', eliminarUsuario);

// Actualizar parcialmente un usuario por su ID
router.patch('/actualizarUsuario/:id_usuario', actualizarUsuarioPatch);

export default router;