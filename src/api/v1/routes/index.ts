import { Router } from "express";
import { auth } from "@/api/v1/middlewares/auth";
import { adminsRoutes } from "./admins";
import { authRoutes } from "./auth";
import { bookingsRoutes } from "./bookings";
import { clientsRoutes } from "./clients";
import { roomStatusesRoutes } from "./room-status";
import { roomTypesRoutes } from "./room-types";
import { roomsRoutes } from "./rooms";
import { telephonesRoutes } from "./telephones";
const routes = Router();

routes.use("/", authRoutes);
routes.use("/clients", auth, clientsRoutes);
routes.use("/telephones", auth, telephonesRoutes);
routes.use("/room-status", auth, roomStatusesRoutes);
routes.use("/room-types", auth, roomTypesRoutes);
routes.use("/rooms", auth, roomsRoutes);
routes.use("/bookings", auth, bookingsRoutes);
routes.use("/admins", auth, adminsRoutes);

export { routes };
