import express from 'express';
import {
    getFacturas,
    getFactura,
    createFactura,
    updateFactura,
    deleteFactura
} from '../controllers/facturas.controller.js';

const router = express.Router();

router.get('/facturas', getFacturas);
router.get('/facturas/:id', getFactura);
router.post('/facturas', createFactura);
router.put('/facturas/:id', updateFactura);
router.delete('/facturas/:id', deleteFactura);

export default router;