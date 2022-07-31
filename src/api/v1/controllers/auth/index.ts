import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "@/config/db";
import { v4 as uuid } from "uuid";
import { InvalidCredentialsError } from "@/api/v1/constants/errors";
import { CreateAdminInput } from "@/api/v1/models/admin";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const login = async (email: string, password: string) => {
    try {
        const result = await db.query(
            `SELECT * FROM admins WHERE email = $1 AND is_active = true`,
            [email]
        );

        if (result.rows.length === 0) {
            throw new InvalidCredentialsError();
        }

        const admin = result.rows[0];

        if (!bcrypt.compareSync(password, admin.password)) {
            throw new InvalidCredentialsError();
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
            },
            JWT_SECRET,
            {
                expiresIn: "4h",
            }
        );

        return token;
    } catch (error) {
        throw error;
    }
};

const register = async (input: CreateAdminInput) => {
    const id = uuid();

    const { name, email, password } = input;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const admin = {
        id,
        name,
        email,
        password: hashedPassword,
    };

    try {
        await db.query(
            `INSERT INTO admins (id, name, email, password) VALUES ($1, $2, $3, $4)`,
            [admin.id, admin.name, admin.email, admin.password]
        );

        return await login(email, password);
    } catch (error) {
        throw error;
    }
};

const getMe = async (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string;
            email: string;
        };

        const result = await db.query(
            `SELECT id, name, email FROM admins WHERE id = $1`,
            [decoded.id]
        );

        if (result.rows.length === 0) {
            throw new InvalidCredentialsError();
        }

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export { login, register, getMe };
