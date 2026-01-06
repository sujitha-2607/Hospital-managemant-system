const express = require('express');
const router = express.Router();
const {populate_room,get_room,discharge_room,admit_room,get_room_by_pid,get_filled_room}=require('../controllers/room_controller')
router.post('/populate',populate_room);
router.get('/available',get_room);
router.get('/filled',get_filled_room);
router.delete('/discharge/:id',discharge_room);
router.post('/admit',admit_room);
router.get('/:pid',get_room_by_pid);
module.exports = router;