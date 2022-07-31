import { v4 as uuid } from "uuid";
import { db } from "@/config/db";
import { Telephone, TelephoneInput } from "@/api/v1/models/telephone";
import {
    createInsertQuery,
    createUpdateQuery,
    getValuesArray,
} from "@/api/v1/helpers/db";

const getAllTelephones = async () => {
    try {
        return await db.query<Telephone>(
            `select telephones.id, telephones.number, telephones.country_code, telephones.area_code, telephones.is_landline, telephones.client_id, telephones.created_at, telephones.updated_at from telephones where telephones.is_active = true order by telephones.updated_at desc`
        );
    } catch (error) {
        throw error;
    }
};

const getTelephoneById = async (id: string) => {
    try {
        return await db.query<Telephone>(
            `select telephones.id, telephones.number, telephones.country_code, telephones.area_code, telephones.is_landline, telephones.client_id, telephones.created_at, telephones.updated_at from telephones where telephones.id = $1 and telephones.is_active = true`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

const createTelephone = async (telephone: TelephoneInput) => {
    try {
        const id = uuid();
        return await db.query(
            createInsertQuery("telephones", telephone, id),
            getValuesArray(telephone)
        );
    } catch (error) {
        throw error;
    }
};

const updateTelephone = async (id: string, telephone: TelephoneInput) => {
    if (!id) {
        throw new Error("Telephone id is required");
    }

    try {
        const values = getValuesArray(telephone);
        return await db.query(createUpdateQuery("telephones", telephone), [
            ...values,
            id,
        ]);
    } catch (error) {
        throw error;
    }
};

const deleteTelephone = async (id: string) => {
    if (!id) {
        throw new Error("Telephone id is required");
    }

    try {
        return await db.query(
            `update telephones set is_active = false where id = $1`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

export {
    getAllTelephones,
    getTelephoneById,
    createTelephone,
    updateTelephone,
    deleteTelephone,
};
