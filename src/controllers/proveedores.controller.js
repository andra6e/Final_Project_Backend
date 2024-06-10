import { pool } from "../db.js";

export const getProveedores = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Proveedores");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM Proveedores WHERE id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM Proveedores WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createProveedor = async (req, res) => {
    try {
        const { nombre, contacto, direccion, telefono, correo } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO Proveedores (nombre, contacto, direccion, telefono, correo) VALUES (?, ?, ?, ?, ?)",
            [nombre, contacto, direccion, telefono, correo]
        );
        res.status(201).json({ id: rows.insertId, nombre, contacto, direccion, telefono, correo });
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, contacto, direccion, telefono, correo } = req.body;

        const [result] = await pool.query(
            "UPDATE Proveedores SET nombre = IFNULL(?, nombre), contacto = IFNULL(?, contacto), direccion = IFNULL(?, direccion), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo) WHERE id = ?",
            [nombre, contacto, direccion, telefono, correo, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Proveedor no encontrado" });

        const [rows] = await pool.query("SELECT * FROM Proveedores WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};
