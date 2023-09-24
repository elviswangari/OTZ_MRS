const router = require('express').Router();
const RocController = require('../controllers/RocController');

router.get('/', RocController.home);
router.get('/users', RocController.getUser);

module.exports = router;