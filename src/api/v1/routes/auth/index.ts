import { Router } from "express";
import { getMe, login, register } from "@/api/v1/controllers/auth";
import { MissingRequiredFieldsError } from "../../constants/errors";

const authRoutes = Router();

authRoutes.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new Error("Email e senha são obrigatórios!"));
    }

    try {
        const token = await login(email, password);

        res.status(200).json({
            token,
        });
    } catch (error) {
        next(error);
    }
});

authRoutes.post("/register", async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new MissingRequiredFieldsError(["nome", "email", "senha"]));
    }

    try {
        const token = await register({ name, email, password });

        return res.status(200).json({
            token,
        });
    } catch (error) {
        next(error);
    }
});

authRoutes.get("/me", async (req, res, next) => {
    const rawToken = req?.headers?.["authorization"];
    const token = rawToken && rawToken?.split?.(" ")?.[1];

    if (!token) {
        return next(new Error("Invalid token"));
    }

    try {
        const me = await getMe(token);

        res.status(200).json({
            me,
        });
    } catch (error) {
        next(error);
    }
});

export { authRoutes };
