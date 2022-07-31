import { Router } from "express";
import {
    createClient,
    deleteClient,
    getAllClients,
    getClientById,
    updateClient,
} from "@/api/v1/controllers/client";

const clientsRoutes = Router();

clientsRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req?.params;

    if (id) {
        try {
            const result = await getClientById(id);
            return res.status(200).send({ client: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        const result = await getAllClients();
        return res
            .status(200)
            .send({ clients: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

clientsRoutes.post("/", async (req, res, next) => {
    try {
        await createClient(req.body);
        res.status(200).send({ message: "Cliente criado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

clientsRoutes.patch("/", async (req, res, next) => {
    try {
        await updateClient(req.body);
        res.status(200).send({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

clientsRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteClient(id);
        res.status(200).send({ message: "Cliente deletado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

export { clientsRoutes };
