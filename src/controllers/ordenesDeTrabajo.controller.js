import { pool } from "../db.js";

export const getOrdenesDeTrabajo = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM OrdenesDeTrabajo");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getOrdenDeTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM OrdenesDeTrabajo WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Orden de trabajo no encontrada" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createOrdenDeTrabajo = async (req, res) => {
    try {
        const { vehiculoId, proveedorId, fechaEmision, detalles, costo, estadoPago, detallesPagoId } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO OrdenesDeTrabajo (vehiculoId, proveedorId, fechaEmision, detalles, costo, estadoPago, detallesPagoId) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [vehiculoId, proveedorId, fechaEmision, detalles, costo, estadoPago, detallesPagoId]
        );
        res.status(201).json({ id: rows.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateOrdenDeTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehiculoId, proveedorId, fechaEmision, detalles, costo, estadoPago, detallesPagoId } = req.body;
        const [result] = await pool.query(
            "UPDATE OrdenesDeTrabajo SET vehiculoId = ?, proveedorId = ?, fechaEmision = ?, detalles = ?, costo = ?, estadoPago = ?, detallesPagoId = ? WHERE id = ?",
            [vehiculoId, proveedorId, fechaEmision, detalles, costo, estadoPago, detallesPagoId, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Orden de trabajo no encontrada" });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteOrdenDeTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM OrdenesDeTrabajo WHERE id = ?", [id]);
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "Orden de trabajo no encontrada" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};
