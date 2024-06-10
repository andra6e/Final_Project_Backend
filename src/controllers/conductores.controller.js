import { pool } from "../db.js";

export const getConductores = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Conductores");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM Conductores WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM Conductores WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createConductor = async (req, res) => {
    try {
        const {id, nombre, telefono, numeroLicencia, expiracionLicencia, foto, notas } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO Conductores (id, nombre, telefono, numeroLicencia, expiracionLicencia, foto, notas) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, nombre, telefono, numeroLicencia, expiracionLicencia, foto, notas]
        );
        res.status(201).json({id, nombre, telefono, numeroLicencia, expiracionLicencia, foto, notas });
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateConductor = async (req, res) => {
    try {
        const { id } = req.params;
            const {nombre, telefono, numeroLicencia, expiracionLicencia, foto, notas } = req.body;

        const [result] = await pool.query(
            "UPDATE Conductores SET nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono), numeroLicencia = IFNULL(?, numeroLicencia), expiracionLicencia = IFNULL(?, expiracionLicencia), foto = IFNULL(?, foto), notas = IFNULL(?, notas) WHERE id = ?",
            [nombre, telefono, numeroLicencia, expiracionLicencia, foto, notas, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Conductor no encontrado" });

        const [rows] = await pool.query("SELECT * FROM Conductores WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};
