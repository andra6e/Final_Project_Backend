import express from "express";
import morgan from "morgan";

import indexRoutes from "./routes/index.routes.js";
import conductoresRoutes from "./routes/conductores.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import recibosRoutes from "./routes/recibos.routes.js";
import ordenesRoutes from "./routes/ordenesDeTrabajo.routes.js";
import programacionMantenimientoRoutes from "./routes/programacionMantenimiento.routes.js";
import facturasRoutes from "./routes/facturas.routes.js";
import detallesDePagoRoutes from "./routes/detallesDePago.routes.js";


const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", conductoresRoutes);
app.use("/api", vehiculosRoutes);
app.use("/api", proveedoresRoutes);
app.use("/api", recibosRoutes);
app.use("/api", ordenesRoutes);
app.use("/api", programacionMantenimientoRoutes);
app.use("/api", facturasRoutes);
app.use("/api", detallesDePagoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
