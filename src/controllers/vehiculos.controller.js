import { pool } from "../db.js";

export const getVehiculos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Vehiculos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM Vehiculos WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM Vehiculos WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createVehiculo = async (req, res) => {
    try {
        const { id, marca, modelo, anio, kilometraje, foto, idConductorAsignado } = req.body;

        // Verificar si el conductor existe
        const [conductor] = await pool.query("SELECT * FROM Conductores WHERE id = ?", [idConductorAsignado]);
        if (conductor.length === 0) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        const [rows] = await pool.query(
            "INSERT INTO Vehiculos (id, marca, modelo, anio, kilometraje, foto, idConductorAsignado) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, marca, modelo, anio, kilometraje, foto, idConductorAsignado]
        );
        res.status(201).json({ id, marca, modelo, anio, kilometraje, foto, idConductorAsignado });
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, anio, kilometraje, foto, idConductorAsignado } = req.body;

        // Verificar si el conductor existe
        const [conductor] = await pool.query("SELECT * FROM Conductores WHERE id = ?", [idConductorAsignado]);
        if (conductor.length === 0) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        const [result] = await pool.query(
            "UPDATE Vehiculos SET marca = IFNULL(?, marca), modelo = IFNULL(?, modelo), anio = IFNULL(?, anio), kilometraje = IFNULL(?, kilometraje), foto = IFNULL(?, foto), idConductorAsignado = IFNULL(?, idConductorAsignado) WHERE id = ?",
            [marca, modelo, anio, kilometraje, foto, idConductorAsignado, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Vehículo no encontrado" });

        const [rows] = await pool.query("SELECT * FROM Vehiculos WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};
