import { Router } from "express";
import {
    createRoomStatus,
    deleteRoomStatus,
    getAllRoomStatuses,
    getRoomStatusById,
    updateRoomStatus,
} from "@/api/v1/controllers/room-status";

const roomStatusesRoutes = Router();

roomStatusesRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        try {
            const result = await getRoomStatusById(id);
            return res.status(200).send({ roomStatus: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        const result = await getAllRoomStatuses();
        return res
            .status(200)
            .send({ roomStatus: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

roomStatusesRoutes.post("/", async (req, res, next) => {
    try {
        await createRoomStatus(req.body);
        res.status(200).send({ message: "Status criado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

roomStatusesRoutes.patch("/", async (req, res, next) => {
    try {
        await updateRoomStatus(req.body);
        res.status(200).send({ message: "Status atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

roomStatusesRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteRoomStatus(id);
        res.status(200).send({ message: "Status deletado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

export { roomStatusesRoutes };
