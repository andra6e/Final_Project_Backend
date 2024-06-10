import { pool } from "../db.js";

export const getFacturas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Facturas");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM Facturas WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createFactura = async (req, res) => {
    try {
        const { fechaEmision, monto, estadoPago, detallesPagoId } = req.body;
        const [result] = await pool.query(
            "INSERT INTO Facturas (fechaEmision, monto, estadoPago, detallesPagoId) VALUES (?, ?, ?, ?)",
            [fechaEmision, monto, estadoPago, detallesPagoId]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaEmision, monto, estadoPago, detallesPagoId } = req.body;
        const [result] = await pool.query(
            "UPDATE Facturas SET fechaEmision = ?, monto = ?, estadoPago = ?, detallesPagoId = ? WHERE id = ?",
            [fechaEmision, monto, estadoPago, detallesPagoId, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM Facturas WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};