import bcrypt from "bcrypt";
import { v4 as uiid } from "uuid";
import {
    createInsertQuery,
    createUpdateQuery,
    getValuesArray,
} from "@/api/v1/helpers/db";
import { db } from "@/config/db";
import {
    Admin,
    CreateAdminInput,
    UpdateAdminInput,
} from "@/api/v1/models/admin";
import {
    MissingRequiredFieldsError,
    MissingIdError,
} from "@/api/v1/constants/errors";
import { deleteFalsyProperties } from "@/api/v1/helpers/object";

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const getAllAdmins = async (id?: string) => {
    try {
        if (id) {
            return await db.query(
                "select id, name, email from admins where id <> $1 and is_active = true order by admins.updated_at desc",
                [id]
            );
        }

        return await db.query<Admin>(
            "select id, name, email from admins where is_active = true order by admins.updated_at desc"
        );
    } catch (err) {
        throw err;
    }
};

const getAdminById = async (id: string) => {
    try {
        return await db.query<Admin>(
            "select id, name, email from admins where id = $1",
            [id]
        );
    } catch (err) {
        throw err;
    }
};

const createAdmin = async (input: CreateAdminInput) => {
    const id = uiid();

    const { name, email, password } = input;

    if (!name || !email || !password) {
        throw new MissingRequiredFieldsError(["nome", "e-mail", "senha"]);
    }

    deleteFalsyProperties(input);

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const admin = {
            id,
            name,
            email,
            password: hashedPassword,
        };

        const values = getValuesArray(admin);

        return await db.query(createInsertQuery("admins", admin), values);
    } catch (err) {
        throw err;
    }
};

const updateAdmin = async (input: UpdateAdminInput) => {
    const { id, ...body } = input;

    if (!id) {
        throw new MissingIdError();
    }

    const { name, email, password } = body;

    if (!name || !email || !password) {
        throw new MissingRequiredFieldsError(["nome", "e-mail", "senha"]);
    }

    deleteFalsyProperties(body);

    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const admin = {
                name,
                email,
                password: hashedPassword,
            };

            const values = getValuesArray(admin);

            return await db.query(createUpdateQuery("admins", admin), [
                ...values,
                id,
            ]);
        }

        const admin = {
            name,
            email,
        };

        const values = getValuesArray(admin);

        return await db.query(createUpdateQuery("admins", admin), [
            ...values,
            id,
        ]);
    } catch (err) {
        throw err;
    }
};

const deleteAdmin = async (id: string) => {
    try {
        return await db.query(
            "UPDATE admins SET is_active = false WHERE id = $1",
            [id]
        );
    } catch (err) {
        throw err;
    }
};

export { getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin };
