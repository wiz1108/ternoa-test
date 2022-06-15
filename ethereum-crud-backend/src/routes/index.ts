import { Router } from 'express'

import item from './item'

const router: Router = Router()

router.get('/test', (req, res) =>
  res.send('OK')
)
router.use('/item', item)

export default router
