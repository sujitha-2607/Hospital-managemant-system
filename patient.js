const express = require('express');
const router = express.Router();
const {populate_patient,
    login_patient,
    register_patient,
    update_patient,
    delete_patient,
    get_patient,
    get_patient_by_username
}=require('../controllers/patient_controller');
router.get('/',get_patient);
router.get('/:username',get_patient_by_username);
router.post('/populate',populate_patient);

router.post('/register',register_patient);
router.patch('/update',update_patient);
router.delete('/delete/:username',delete_patient);
router.post('/login',login_patient);
module.exports = router;