const express = require('express');
const router = express.Router();
const {populate_fdo,
    login_fdo,
    register_fdo,
    update_fdo,
    delete_fdo,
    get_fdo,
    get_fdo_by_username
}=require('../controllers/fdo_controller');
router.get('/',get_fdo);
router.get('/:username',get_fdo_by_username);
router.post('/populate',populate_fdo);

router.post('/register',register_fdo);
router.patch('/update',update_fdo);
router.delete('/delete/:username',delete_fdo);
router.post('/login',login_fdo);
module.exports = router;
