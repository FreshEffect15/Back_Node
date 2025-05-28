import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export const register = async ({ nombre, email, password, rol }: any) => {
    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) throw new Error('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hashedPassword, rol },
    select: { id: true, nombre: true, email: true, rol: true, createdAt: true }
    });

    return usuario;
};

export const login = async ({ email, password }: any) => {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new Error('Credenciales inválidas');

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return token;
};
