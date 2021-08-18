import express from 'express';
import personController from '../controller/person.controller.js';
const router = express.Router();

router.post('/', personController.register);
router.get('/maisVendidos', personController.getMaisVendidos);
router.patch('/:id', personController.update);
router.patch('/delivery/:id', personController.updatedelivery);
router.delete('/delete/:id', personController.delete);
router.get('/client/:client', personController.oneClient);
router.get('/product/:product', personController.totalProduct);
router.get('/:id', personController.one);
export default router;