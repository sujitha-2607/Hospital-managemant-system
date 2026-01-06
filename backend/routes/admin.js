const express = require('express');
const router = express.Router();

const {create_table_admin,
    create_table_appointments,
    create_table_patient,
    create_table_doctor,
    create_table_treatment,
    create_table_test,
    create_table_fdo,
    create_table_room,
create_table_deo,
populate_admins,
login_admin,
register_admin,
update_admin,
delete_admin

} = require('../controllers/admin_controller');
router.get('/create-admin',create_table_admin) ;
router.get('/create-patient',create_table_patient) ;
router.get('/create-appointment',create_table_appointments);
router.get('/create-doctor',create_table_doctor);
router.get('/create-treatment',create_table_treatment);
router.get('/create-test',create_table_test);
router.get('/create-fdo',create_table_fdo);
router.get('/create-deo',create_table_deo);
router.get ('/create-room',create_table_room);
router.post('/populate',populate_admins);
router.post('/register',register_admin);
router.patch('/update',update_admin);
router.delete('/delete/:username',delete_admin);
router.post('/login',login_admin);
module.exports = router;
