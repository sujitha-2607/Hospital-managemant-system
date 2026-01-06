const express = require('express');
const router = express.Router();
const {populate_test,get_test,update_test,create_test,delete_test,get_test_pid}=require('../controllers/test_controller')
router.post('/populate',populate_test);
router.get('/:aid',get_test);
router.patch('/update',update_test);
router.delete('/delete/:id',delete_test);
router.post('/create',create_test);
router.get('/by_pid/:pid',get_test_pid)
module.exports = router;