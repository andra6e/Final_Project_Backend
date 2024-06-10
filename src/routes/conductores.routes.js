import { Router } from "express";
import {
  createConductor,
  deleteConductor,
  getConductor,
  getConductores,
  updateConductor,
} from "../controllers/conductores.controller.js";

const router = Router();

// GET all Conductores
router.get("/conductores", getConductores);

// GET A Conductor
router.get("/conductores/:id", getConductor);

// DELETE A Conductor
router.delete("/conductores/:id", deleteConductor);

// INSERT A Conductor
router.post("/conductores", createConductor);

router.patch("/conductores/:id", updateConductor);

export default router;
