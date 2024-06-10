import { Router } from "express";
import {
  createProveedor,
  deleteProveedor,
  getProveedor,
  getProveedores,
  updateProveedor,
} from "../controllers/proveedores.controller.js";

const router = Router();

// GET all Proveedores
router.get("/proveedores", getProveedores);

// GET A Proveedor
router.get("/proveedores/:id", getProveedor);

// DELETE A Proveedor
router.delete("/proveedores/:id", deleteProveedor);

// INSERT A Proveedor
router.post("/proveedores", createProveedor);

// UPDATE A Proveedor
router.patch("/proveedores/:id", updateProveedor);

export default router;
