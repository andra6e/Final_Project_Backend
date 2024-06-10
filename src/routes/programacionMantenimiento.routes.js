import { Router } from "express";
import {
    createProgramacionMantenimiento,
    getProgramacionesMantenimiento,
    getProgramacionMantenimiento,
    updateProgramacionMantenimiento,
    deleteProgramacionMantenimiento
} from "../controllers/programacionMantenimiento.controller.js";

const router = Router();

router.post("/programacionMantenimiento", createProgramacionMantenimiento);
router.get("/programacionMantenimiento", getProgramacionesMantenimiento);
router.get("/programacionMantenimiento/:id", getProgramacionMantenimiento);
router.put("/programacionMantenimiento/:id", updateProgramacionMantenimiento);
router.delete("/programacionMantenimiento/:id", deleteProgramacionMantenimiento);

export default router;