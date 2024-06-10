import { pool } from "../db.js";


export const getRecibos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Recibos");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al obtener los recibos" });
    }
};

export const getRecibo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM Recibos WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Recibo no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al obtener el recibo" });
    }
};

export const createRecibo = async (req, res) => {
    try {
        const { ordenTrabajoId, fechaEmision, monto, estadoPago, detallesPagoId } = req.body;
        const [result] = await pool.query(
            "INSERT INTO Recibos (ordenTrabajoId, fechaEmision, monto, estadoPago, detallesPagoId) VALUES (?, ?, ?, ?, ?)",
            [ordenTrabajoId, fechaEmision, monto, estadoPago, detallesPagoId]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al crear el recibo" });
    }
};

export const updateRecibo = async (req, res) => {
    try {
        const { id } = req.params;
        const { ordenTrabajoId, fechaEmision, monto, estadoPago, detallesPagoId } = req.body;
        const [result] = await pool.query(
            "UPDATE Recibos SET ordenTrabajoId = ?, fechaEmision = ?, monto = ?, estadoPago = ?, detallesPagoId = ? WHERE id = ?",
            [ordenTrabajoId, fechaEmision, monto, estadoPago, detallesPagoId, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Recibo no encontrado" });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al actualizar el recibo" });
    }
};

export const deleteRecibo = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM Recibos WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Recibo no encontrado" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al eliminar el recibo" });
    }
};
