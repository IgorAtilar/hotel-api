import { Router } from "express";
import {
    getAllTelephones,
    getTelephoneById,
    createTelephone,
    deleteTelephone,
    updateTelephone,
} from "@/api/v1/controllers/telephone";

const telephonesRoutes = Router();

telephonesRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        try {
            const result = await getTelephoneById(id);
            return res.status(200).send({ telephone: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        const result = await getAllTelephones();
        return res
            .status(200)
            .send({ telephones: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

telephonesRoutes.post("/", async (req, res, next) => {
    try {
        await createTelephone(req.body);
        res.status(200).send({ message: "Telefone criado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

telephonesRoutes.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await updateTelephone(id, req.body);
        res.status(200).send({ message: "Telefone atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

telephonesRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteTelephone(id);
        res.status(200).send({ message: "Telefone deletado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

export { telephonesRoutes };
