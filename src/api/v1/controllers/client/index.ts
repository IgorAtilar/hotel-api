import { v4 as uuid } from "uuid";
import { db } from "@/config/db";
import {
    Client,
    CreateClientInput,
    UpdateClientInput,
} from "@/api/v1/models/client";
import {
    createInsertQuery,
    createUpdateQuery,
    getValuesArray,
} from "@/api/v1/helpers/db";
import {
    MissingIdError,
    MissingRequiredFieldsError,
} from "@/api/v1/constants/errors";
import { deleteFalsyProperties } from "@/api/v1/helpers/object";

const getAllClients = async () => {
    try {
        return await db.query<Client>(
            `select clients.id, clients.cpf, clients.name, clients.email, clients.address, clients.wifi_password, (select array(select json_build_object('id', telephones.id, 'area_code', telephones.area_code, 'number', telephones.number, 'is_landline', telephones.is_landline) from telephones where telephones.client_id = clients.id and telephones.is_active = true)) as telephones, (select array (select json_build_object('id', bookings.id, 'room', rooms.number, 'start_date', bookings.start_date, 'end_date', bookings.end_date) from bookings, rooms where bookings.client_id = clients.id and bookings.room_id = rooms.id and bookings.is_active = true)) as bookings from clients where clients.is_active = true order by clients.updated_at desc`
        );
    } catch (error) {
        throw error;
    }
};

const getClientById = async (id: string) => {
    try {
        return await db.query<Client>(
            `select clients.id, clients.cpf, clients.name, clients.email, clients.address, clients.birthdate, clients.wifi_password from clients where clients.id = $1 and clients.is_active = true`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

const createClient = async (client: CreateClientInput) => {
    const { name, cpf, email } = client;

    if (!name || !cpf || !email) {
        throw new MissingRequiredFieldsError(["nome", "cpf", "email"]);
    }

    deleteFalsyProperties(client);

    try {
        const id = uuid();
        return await db.query(
            createInsertQuery("clients", client, id),
            getValuesArray(client)
        );
    } catch (error) {
        throw error;
    }
};

const updateClient = async (client: UpdateClientInput) => {
    const { id, ...body } = client;
    if (!id) {
        throw new MissingIdError();
    }

    if (!body.name || !body.cpf || !body.email) {
        throw new MissingRequiredFieldsError(["nome", "cpf", "email"]);
    }

    deleteFalsyProperties(body);

    try {
        const values = getValuesArray(body);
        return await db.query(createUpdateQuery("clients", body), [
            ...values,
            id,
        ]);
    } catch (error) {
        throw error;
    }
};

const deleteClient = async (id: string) => {
    if (!id) {
        throw new MissingIdError();
    }

    try {
        return await db.query(
            `update clients set is_active = false where id = $1`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

export {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
};
