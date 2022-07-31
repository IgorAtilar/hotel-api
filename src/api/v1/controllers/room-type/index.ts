import { v4 as uuid } from "uuid";
import { db } from "@/config/db";
import {
    RoomType,
    CreateRoomTypeInput,
    UpdateRoomTypeInput,
} from "@/api/v1/models/room-type";
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

const getAllRoomTypes = async () => {
    try {
        return await db.query<RoomType>(
            `select room_types.id, room_types.name, room_types.daily_price from room_types where room_types.is_active = true order by room_types.updated_at desc`
        );
    } catch (error) {
        throw error;
    }
};

const getRoomTypeById = async (id: string) => {
    try {
        return await db.query<RoomType>(
            `select room_types.id, room_types.name, room_types.daily_price from room_types where room_types.id = $1 and room_types.is_active = true`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

const createRoomType = async (roomType: CreateRoomTypeInput) => {
    if (!roomType.name) {
        throw new MissingRequiredFieldsError(["nome do tipo de quarto"]);
    }

    deleteFalsyProperties(roomType);

    try {
        const id = uuid();

        const roomTypeDeleted = await db.query(
            `select room_types.id from room_types where room_types.name = $1 and room_types.is_active = false`,
            [roomType.name]
        );

        if (roomTypeDeleted.rows.length > 0) {
            return await db.query(
                `update room_types set is_active = true where room_types.id = $1`,
                [roomTypeDeleted.rows[0].id]
            );
        }

        return await db.query(
            createInsertQuery("room_types", roomType, id),
            getValuesArray(roomType)
        );
    } catch (error) {
        throw error;
    }
};

const updateRoomType = async (roomType: UpdateRoomTypeInput) => {
    const { id, ...body } = roomType;

    if (!id) {
        throw new MissingIdError();
    }

    if (!body.name) {
        throw new MissingRequiredFieldsError(["nome do tipo de quarto"]);
    }

    deleteFalsyProperties(body);

    try {
        const values = getValuesArray(body);
        return await db.query(createUpdateQuery("room_types", body), [
            ...values,
            id,
        ]);
    } catch (error) {
        throw error;
    }
};

const deleteRoomType = async (id: string) => {
    if (!id) {
        throw new MissingIdError();
    }

    try {
        return await db.query(
            `update room_types set is_active = false where id = $1`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

export {
    getAllRoomTypes,
    getRoomTypeById,
    createRoomType,
    updateRoomType,
    deleteRoomType,
};
