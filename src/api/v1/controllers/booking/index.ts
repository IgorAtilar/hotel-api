import { v4 as uuid } from "uuid";
import { db } from "@/config/db";
import {
    Booking,
    CreateBookingInput,
    UpdateBookingInput,
} from "@/api/v1/models/booking";
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

const getAllBookings = async () => {
    try {
        return await db.query<Booking>(
            `select bookings.id, clients.cpf as client_cpf, clients.name as client_name, clients.email as client_email, rooms.number as room_number, bookings.start_date, bookings.end_date from bookings, clients, rooms where bookings.client_id = clients.id and bookings.room_id = rooms.id and bookings.is_active = true order by bookings.updated_at desc`
        );
    } catch (error) {
        throw error;
    }
};

const getBookingById = async (id: string) => {
    if (!id) {
        throw new MissingIdError();
    }

    try {
        return await db.query<Booking>(
            `select bookings.id, bookings.client_id, bookings.room_id, bookings.start_date, bookings.end_date from bookings where id = $1 and is_active = true`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

const createBooking = async (booking: CreateBookingInput) => {
    const { client_id, room_id, start_date, end_date } = booking;

    if (!client_id || !room_id || !start_date || !end_date) {
        throw new MissingRequiredFieldsError([
            "id do cliente",
            "id da sala",
            "data de check-in",
            "data de check-out",
        ]);
    }

    deleteFalsyProperties(booking);

    try {
        const id = uuid();
        return await db.query(
            createInsertQuery("bookings", booking, id),
            getValuesArray(booking)
        );
    } catch (error) {
        throw error;
    }
};

const updateBooking = async (booking: UpdateBookingInput) => {
    const { id, ...body } = booking;

    if (!id) {
        throw new MissingIdError();
    }

    if (
        !body.client_id ||
        !body.room_id ||
        !body.start_date ||
        !body.end_date
    ) {
        throw new MissingRequiredFieldsError([
            "id do cliente",
            "id da sala",
            "data de check-in",
            "data de check-out",
        ]);
    }

    deleteFalsyProperties(body);

    try {
        const values = getValuesArray(body);
        return await db.query(createUpdateQuery("bookings", body), [
            ...values,
            id,
        ]);
    } catch (error) {
        throw error;
    }
};

const deleteBooking = async (id: string) => {
    if (!id) {
        throw new MissingIdError();
    }

    try {
        return await db.query(
            `update bookings set is_active = false where id = $1`,
            [id]
        );
    } catch (error) {
        throw error;
    }
};

export {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
};
