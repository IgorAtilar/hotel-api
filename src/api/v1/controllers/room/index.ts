import { v4 as uuid } from "uuid";
import { db } from "@/config/db";
import { Room, CreateRoomInput, UpdateRoomInput } from "@/api/v1/models/room";
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

const getAllRooms = async () => {
    try {
        return await db.query<Room>(
            `select rooms.id, rooms.number, room_types.name as room_type, room_types.daily_price, room_status.name as status from rooms left join room_types on rooms.room_type_id = room_types.id and room_types.is_active = true left join room_status on rooms.room_status_id = room_status.id and room_status.is_active = true where rooms.is_active = true order by rooms.updated_at desc`
        );
    } catch (error) {
        throw error;
    }
};

const getRoomById = async (id: string) => {
    try {
        return await db.query<Room>(
            `select rooms.id, rooms.number, rooms.room_type_id, rooms.room_status_id from rooms where id = $1 and is_active = true`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

const createRoom = async (room: CreateRoomInput) => {
    const { number } = room;

    if (!number) {
        throw new MissingRequiredFieldsError(["número do quarto"]);
    }

    deleteFalsyProperties(room);

    try {
        const id = uuid();
        return await db.query(
            createInsertQuery("rooms", room, id),
            getValuesArray(room)
        );
    } catch (error) {
        throw error;
    }
};

const updateRoom = async (room: UpdateRoomInput) => {
    const { id, ...body } = room;

    if (!id) {
        throw new MissingIdError();
    }

    if (!body.number) {
        throw new MissingRequiredFieldsError(["número do quarto"]);
    }

    deleteFalsyProperties(body);

    try {
        const values = getValuesArray(body);
        return await db.query(createUpdateQuery("rooms", body), [
            ...values,
            id,
        ]);
    } catch (error) {
        throw error;
    }
};

const deleteRoom = async (id: string) => {
    if (!id) {
        throw new MissingIdError();
    }

    try {
        return await db.query(
            `update rooms set is_active = false where id = $1`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

export { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom };
