import { Router } from "express";
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
} from "@/api/v1/controllers/room";

const roomsRoutes = Router();

roomsRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        try {
            const result = await getRoomById(id);
            return res.status(200).send({ room: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        const result = await getAllRooms();
        return res
            .status(200)
            .send({ rooms: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

roomsRoutes.post("/", async (req, res, next) => {
    try {
        await createRoom(req.body);
        res.status(200).send({ message: "Quarto criado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

roomsRoutes.patch("/", async (req, res, next) => {
    try {
        await updateRoom(req.body);
        res.status(200).send({ message: "Quarto atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

roomsRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteRoom(id);
        res.status(200).send({ message: "Quarto deletado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

export { roomsRoutes };
