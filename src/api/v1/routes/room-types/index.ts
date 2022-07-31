import { Router } from "express";
import {
    createRoomType,
    deleteRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomType,
} from "@/api/v1/controllers/room-type";

const roomTypesRoutes = Router();

roomTypesRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        try {
            const result = await getRoomTypeById(id);
            return res.status(200).send({ roomType: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        const result = await getAllRoomTypes();
        return res
            .status(200)
            .send({ roomTypes: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

roomTypesRoutes.post("/", async (req, res, next) => {
    try {
        await createRoomType(req.body);
        res.status(200).send({ message: "Tipo de quarto criado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

roomTypesRoutes.patch("/", async (req, res, next) => {
    try {
        await updateRoomType(req.body);
        res.status(200).send({
            message: "Tipo de quarto atualizado com sucesso!",
        });
    } catch (error) {
        next(error);
    }
});

roomTypesRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteRoomType(id);
        res.status(200).send({
            message: "Tipo de quarto deletado com sucesso!",
        });
    } catch (error) {
        next(error);
    }
});

export { roomTypesRoutes };
