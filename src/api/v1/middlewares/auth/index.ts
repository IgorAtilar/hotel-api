import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { InvalidCredentialsError } from "@/api/v1/constants/errors";

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const rawToken = req.headers?.["authorization"];
    const token = rawToken?.split?.(" ")?.[1];

    if (!token) {
        throw new InvalidCredentialsError();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            throw new InvalidCredentialsError();
        }
    } catch {
        throw new InvalidCredentialsError();
    }

    return next();
};
