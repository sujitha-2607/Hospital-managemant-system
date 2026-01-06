const express = require('express');
const router = express.Router();
const {populate_deo,
    login_deo,
    register_deo,
    update_deo,
    delete_deo,
    get_deo,
    get_deo_by_username
}=require('../controllers/deo_controller');
router.get('/',get_deo);
router.get('/:username',get_deo_by_username);
router.post('/populate',populate_deo);

router.post('/register',register_deo);
router.patch('/update',update_deo);
router.delete('/delete/:username',delete_deo);
router.post('/login',login_deo);
module.exports = router;
