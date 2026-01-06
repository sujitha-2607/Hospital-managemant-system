const express = require('express');
const router = express.Router();

const {populate_appointments,get_appointment,get_slots,
    book_appointment,
delete_appointment,
update_appointment} = require('../controllers/appointment_controller');
router.post('/populate',populate_appointments);
router.post('/',get_appointment);
router.get('/slots/:did',get_slots);
router.post('/create',book_appointment);
router.delete('/delete/:aid',delete_appointment);
router.patch('/update',update_appointment);

module.exports=router;