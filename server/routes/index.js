const { Router } = require('express');

const router = Router();

router.use(require('./hasPay'));
router.use(require('./page'));

module.exports = router;