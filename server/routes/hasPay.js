const { Router } = require('express');

const {
    Method1,
    Method2
} = require('../controllers/hasPay');

const router = Router();

router.post('/sendPay/method1', Method1);
router.post('/sendPay/method2', Method2);

module.exports = router;