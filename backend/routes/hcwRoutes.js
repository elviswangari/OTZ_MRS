const router = require('express').Router();
const hcwController = require('../controllers/HcwController');

router.get('/users', hcwController.getUser);

module.exports = router;