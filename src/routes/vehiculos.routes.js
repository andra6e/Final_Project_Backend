import { Router } from "express";
import {
  createVehiculo,
  deleteVehiculo,
  getVehiculo,
  getVehiculos,
  updateVehiculo,
} from "../controllers/vehiculos.controller.js";

const router = Router();

// GET todos los Vehículos
router.get("/vehiculos", getVehiculos);

// GET un Vehículo
router.get("/vehiculos/:id", getVehiculo);

// DELETE un Vehículo
router.delete("/vehiculos/:id", deleteVehiculo);

// INSERT un Vehículo
router.post("/vehiculos", createVehiculo);

// UPDATE un Vehículo
router.patch("/vehiculos/:id", updateVehiculo);

export default router;
