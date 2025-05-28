import { Request, Response } from 'express';
import * as usuarioService from '../services/UsuarioService';

export const register = async (req: Request, res: Response) => {
    try {
        const nuevoUsuario = await usuarioService.register(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await usuarioService.login(req.body);
        res.json({ token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const perfil = async (req: Request, res: Response) => {
    res.json({ mensaje: 'Acceso autorizado', usuario: req.usuario });
};
