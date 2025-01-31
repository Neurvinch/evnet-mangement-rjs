const express = require('express');
const { protect } = require('../middleware/AuthMiddleware');
const { createEvent, getAllEvents, bookEvent } = require('../controller/eventController');
const router = express.Router();


router.post('/create', protect, createEvent );
router.get('/', getAllEvents);
router.post('/book/:id', protect, bookEvent);

module.exports = router;