import { DatabaseError } from "pg";
import { NextFunction, Request, Response } from "express";
import { capitalizeFirstLetter } from "@/api/v1/helpers/string";
import {
    InvalidCredentialsError,
    MissingIdError,
    MissingRequiredFieldsError,
} from "@/api/v1/constants/errors";

const errorHandler = (
    err: DatabaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof InvalidCredentialsError) {
        return res.status(401).json({
            message: capitalizeFirstLetter(err.message),
        });
    }

    if (err instanceof MissingIdError) {
        return res.status(400).json({
            message: capitalizeFirstLetter(err.message),
        });
    }

    if (err instanceof MissingRequiredFieldsError) {
        return res.status(400).json({
            message: capitalizeFirstLetter(err.message),
        });
    }

    if (err.code === "23505") {
        const duplicatedField = err.constraint.split("_")[1];
        return res.status(400).json({
            message: `${capitalizeFirstLetter(duplicatedField)} já cadastrado!`,
        });
    }

    res.status(500).send({
        message: "Algo deu errado! Tente novamente mais tarde.",
    });
};

export { errorHandler };
