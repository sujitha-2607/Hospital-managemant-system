const express = require('express');
const router = express.Router();
const {populate_treatment,get_treatment,update_treatment,create_treatment,delete_treatment,get_treatment_pid}=require('../controllers/treatment_controller')
router.post('/populate',populate_treatment);
router.get('/:aid',get_treatment);
router.patch('/update',update_treatment);
router.delete('/delete/:id',delete_treatment);
router.get('/by_pid/:pid',get_treatment_pid)
router.post('/create',create_treatment);
module.exports = router;
