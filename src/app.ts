import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usuarioRoutes from './routes/UsuarioRoutes'; // aún por crear

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Ruta base
app.get('/', (_req, res) => {
    res.send('API funcionando correctamente.');
});

export default app;