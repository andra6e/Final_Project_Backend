import { pool } from "../db.js";

export const getDetallesDePago = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM DetallesDePago");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al obtener los detalles de pago" });
    }
};

export const getDetalleDePago = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM DetallesDePago WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Detalle de pago no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al obtener el detalle de pago" });
    }
};

export const createDetalleDePago = async (req, res) => {
    try {
        const { fechaPago, metodoPago, monto } = req.body;
        const [result] = await pool.query(
            "INSERT INTO DetallesDePago (fechaPago, metodoPago, monto) VALUES (?, ?, ?)",
            [fechaPago, metodoPago, monto]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al crear el detalle de pago" });
    }
};

export const updateDetalleDePago = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaPago, metodoPago, monto } = req.body;
        const [result] = await pool.query(
            "UPDATE DetallesDePago SET fechaPago = ?, metodoPago = ?, monto = ? WHERE id = ?",
            [fechaPago, metodoPago, monto, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de pago no encontrado" });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al actualizar el detalle de pago" });
    }
};

export const deleteDetalleDePago = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM DetallesDePago WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detalle de pago no encontrado" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal al eliminar el detalle de pago" });
    }
};
