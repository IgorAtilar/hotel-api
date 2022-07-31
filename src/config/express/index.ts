import express from "express";
import cors from "cors";
import helmet from "helmet";
import { routes } from "@/api/v1/routes";
import { errorHandler } from "@/api/v1/middlewares/error";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

export { app };
