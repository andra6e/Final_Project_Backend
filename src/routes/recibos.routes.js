import { Router } from "express";
import { getRecibos, getRecibo, createRecibo, updateRecibo, deleteRecibo } from "../controllers/recibos.controller.js";

const router = Router();

router.get("/recibos", getRecibos);
router.get("/recibos/:id", getRecibo);
router.post("/recibos", createRecibo);
router.put("/recibos/:id", updateRecibo);
router.delete("/recibos/:id", deleteRecibo);

export default router;