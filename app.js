import express from 'express';

// === CORREGIDO: scr → src ===
import rutasCategorias from './src/routes/categorias.routes.js';
import rutasClientes from './src/routes/clientes.routes.js';
import rutasCompras from './src/routes/compras.routes.js';
import rutasDetallesCompra from './src/routes/detalles_compras.routes.js';
import rutasDetallesVenta from './src/routes/detalle_venta.routes.js';
import rutasEmpleados from './src/routes/empleados.routes.js';  // ← ¡Falta la 'u' en "routes"!
import rutasProductos from './src/routes/productos.routes.js';
import rutasUsuarios from './src/routes/usuarios.routes.js';
import rutasVentas from './src/routes/ventas.routes.js';

// Crear la aplicación de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// === Rutas con prefijo /api ===
app.use('/api/categorias', rutasCategorias);
app.use('/api/clientes', rutasClientes);
app.use('/api/compras', rutasCompras);
app.use('/api/detalles-compra', rutasDetallesCompra);
app.use('/api/detalles-venta', rutasDetallesVenta);
app.use('/api/empleados', rutasEmpleados);
app.use('/api/productos', rutasProductos);
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/ventas', rutasVentas);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
  });
});

// Exportar app (para usarlo en index.js)
export default app;