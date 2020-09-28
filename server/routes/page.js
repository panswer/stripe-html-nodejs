const { Router } = require('express');

const { LoagIndex } = require('../controllers/page');

const router = Router();

router.get('/', LoagIndex);

module.exports = router;