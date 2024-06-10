import { Router } from "express";
import {
    getOrdenesDeTrabajo,
    getOrdenDeTrabajo,
    createOrdenDeTrabajo,
    updateOrdenDeTrabajo,
    deleteOrdenDeTrabajo
} from "../controllers/ordenesDeTrabajo.controller.js";

const router = Router();

router.get("/ordenesDeTrabajo", getOrdenesDeTrabajo);
router.get("/ordenesDeTrabajo/:id", getOrdenDeTrabajo);
router.post("/ordenesDeTrabajo", createOrdenDeTrabajo);
router.patch("/ordenesDeTrabajo/:id", updateOrdenDeTrabajo);
router.delete("/ordenesDeTrabajo/:id", deleteOrdenDeTrabajo);

export default router;
