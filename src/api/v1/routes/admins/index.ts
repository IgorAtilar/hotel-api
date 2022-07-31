import { Router } from "express";
import {
    createAdmin,
    deleteAdmin,
    getAdminById,
    getAllAdmins,
    updateAdmin,
} from "@/api/v1/controllers/admin";
import { getMe } from "../../controllers/auth";

const adminsRoutes = Router();

adminsRoutes.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    const rawToken = req?.headers?.["authorization"];
    const token = rawToken && rawToken?.split?.(" ")?.[1];

    if (id) {
        try {
            const result = await getAdminById(id);
            return res.status(200).send({ admin: result.rows[0] });
        } catch (error) {
            next(error);
        }
    }

    try {
        if (token) {
            const me = await getMe(token);
            const result = await getAllAdmins(me.id);
            return res.status(200).send({ admins: result.rows });
        }

        const result = await getAllAdmins();
        return res
            .status(200)
            .send({ admins: result.rows, count: result.rowCount });
    } catch (error) {
        next(error);
    }
});

adminsRoutes.post("/", async (req, res, next) => {
    try {
        await createAdmin(req.body);
        res.status(200).send({ message: "Administrador criado com sucesso!" });
    } catch (error) {
        next(error);
    }
});

adminsRoutes.patch("/", async (req, res, next) => {
    try {
        await updateAdmin(req.body);
        res.status(200).send({
            message: "Administrador atualizado com sucesso!",
        });
    } catch (error) {
        next(error);
    }
});

adminsRoutes.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteAdmin(id);
        res.status(200).send({
            message: "Administrador deletado com sucesso!",
        });
    } catch (error) {
        next(error);
    }
});

export { adminsRoutes };
