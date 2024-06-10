import app from "./app.js";
import { PORT } from "./config.js";
import { pool } from "./db.js";

app.listen(PORT, async () => {
    try {
        await pool.getConnection();
        console.log("Conexión exitosa a la base de datos.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
});
