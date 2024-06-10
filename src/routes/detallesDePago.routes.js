import express from 'express';
import {
    getDetallesDePago,
    getDetalleDePago,
    createDetalleDePago,
    updateDetalleDePago,
    deleteDetalleDePago
} from '../controllers/detallesDePago.controller.js';

const router = express.Router();

router.get('/detallesDePago', getDetallesDePago);
router.get('/detallesDePago/:id', getDetalleDePago);
router.post('/detallesDePago', createDetalleDePago);
router.put('/detallesDePago/:id', updateDetalleDePago);
router.delete('/detallesDePago/:id', deleteDetalleDePago);

export default router;
