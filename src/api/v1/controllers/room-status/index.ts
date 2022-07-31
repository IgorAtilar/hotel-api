import { v4 as uuid } from "uuid";
import { db } from "@/config/db";
import {
    RoomStatus,
    CreateRoomStatusInput,
    UpdateRoomStatusInput,
} from "@/api/v1/models/room-status";
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

const getAllRoomStatuses = async () => {
    try {
        return await db.query<RoomStatus>(
            `select room_status.id, room_status.name from room_status where room_status.is_active = true order by room_status.updated_at desc`
        );
    } catch (error) {
        throw error;
    }
};

const getRoomStatusById = async (id: string) => {
    try {
        return await db.query<RoomStatus>(
            `select room_status.id, room_status.name from room_status where room_status.id = $1 and room_status.is_active = true`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

const createRoomStatus = async (roomStatus: CreateRoomStatusInput) => {
    const { name } = roomStatus;

    if (!name) {
        throw new MissingRequiredFieldsError(["nome do status do quarto"]);
    }

    deleteFalsyProperties(roomStatus);

    try {
        const id = uuid();

        const roomStatusDeleted = await db.query(
            `select room_status.id from room_status where room_status.name = $1 and room_status.is_active = false`,
            [roomStatus.name]
        );

        if (roomStatusDeleted.rows.length > 0) {
            return await db.query(
                `update room_status set is_active = true where room_status.id = $1`,
                [roomStatusDeleted.rows[0].id]
            );
        }

        return await db.query(
            createInsertQuery("room_status", roomStatus, id),
            getValuesArray(roomStatus)
        );
    } catch (error) {
        throw error;
    }
};

const updateRoomStatus = async (roomStatus: UpdateRoomStatusInput) => {
    const { id, ...body } = roomStatus;

    if (!id) {
        throw new MissingIdError();
    }

    if (!body.name) {
        throw new MissingRequiredFieldsError(["nome do status do quarto"]);
    }

    deleteFalsyProperties(body);

    try {
        const values = getValuesArray(body);
        return await db.query(createUpdateQuery("room_status", body), [
            ...values,
            id,
        ]);
    } catch (error) {
        throw error;
    }
};

const deleteRoomStatus = async (id: string) => {
    if (!id) {
        throw new MissingIdError();
    }

    try {
        return await db.query(
            `update room_status set is_active = false where id = $1`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

export {
    getAllRoomStatuses,
    getRoomStatusById,
    createRoomStatus,
    updateRoomStatus,
    deleteRoomStatus,
};
