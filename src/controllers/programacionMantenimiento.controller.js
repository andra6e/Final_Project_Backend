import { pool } from "../db.js";

export const getProgramacionesMantenimiento = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM ProgramacionMantenimiento");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getProgramacionMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM ProgramacionMantenimiento WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Programación de mantenimiento no encontrada" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createProgramacionMantenimiento = async (req, res) => {
    try {
        const { vehiculoId, tarea, fechaProxima, recordatorioEnviado } = req.body;
        const [result] = await pool.query(
            "INSERT INTO ProgramacionMantenimiento (vehiculoId, tarea, fechaProxima, recordatorioEnviado) VALUES (?, ?, ?, ?)",
            [vehiculoId, tarea, fechaProxima, recordatorioEnviado]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateProgramacionMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehiculoId, tarea, fechaProxima, recordatorioEnviado } = req.body;
        const [result] = await pool.query(
            "UPDATE ProgramacionMantenimiento SET vehiculoId = ?, tarea = ?, fechaProxima = ?, recordatorioEnviado = ? WHERE id = ?",
            [vehiculoId, tarea, fechaProxima, recordatorioEnviado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Programación de mantenimiento no encontrada" });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteProgramacionMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM ProgramacionMantenimiento WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Programación de mantenimiento no encontrada" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

