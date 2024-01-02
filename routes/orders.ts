import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orders';
import { ValidarJWT } from '../middlewares/validarJWT';
import { recolectarErrores } from '../middlewares/recolectErrors';
import { ValidarUser } from '../middlewares/validarUser';
import { check } from 'express-validator';

const router = Router();

router.get('/',[
  ValidarJWT, 
  recolectarErrores
], getOrders )

router.post('/', [
  ValidarJWT, 
  ValidarUser,
  check('user', 'Ingresar el usuario es obligatorio').not().isEmpty(),
  check('total', 'El total de la orden es obligatorio').not().isEmpty(),
  check('items', 'No puede generarse la orden sin agregar al menos 1 Item').not().isEmpty(),
  recolectarErrores
], createOrder)

export default router;