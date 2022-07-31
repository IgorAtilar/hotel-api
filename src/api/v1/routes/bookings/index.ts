import { Router } from "express";
import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
} from "@/api/v1/controllers/booking";

const bookingsRoutes = Router();

bookingsRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        try {
            const result = await getBookingById(id);
            return res.status(200).send({ booking: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        const result = await getAllBookings();
        return res
            .status(200)
            .send({ bookings: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

bookingsRoutes.post("/", async (req, res, next) => {
    try {
        await createBooking(req.body);
        res.status(200).send({ message: "Reserva criada com sucesso!" });
    } catch (error) {
        next(error);
    }
});

bookingsRoutes.patch("/", async (req, res, next) => {
    try {
        await updateBooking(req.body);
        res.status(200).send({ message: "Reserva atualizada com sucesso!" });
    } catch (error) {
        next(error);
    }
});

bookingsRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteBooking(id);
        res.status(200).send({ message: "Reserva deletada com sucesso!" });
    } catch (error) {
        next(error);
    }
});

export { bookingsRoutes };
