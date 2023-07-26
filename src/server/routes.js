import express from 'express';

import { getAddress } from './apis';

const router = express.Router({
  mergeParams: true,
});

router.get('/api/address', getAddress);

export default router;
