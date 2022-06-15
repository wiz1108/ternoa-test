import { Router } from 'express'

import ctrl from '../controllers/item'

const router: Router = Router()

router.post('/addItem', ctrl.addItem)
router.post('/updateItem', ctrl.updateItem)
router.post('/deleteItem', ctrl.deleteItem)
router.post('/getItem', ctrl.getItem)
export default router;