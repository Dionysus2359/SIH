// backend/routes/timetableRoutes.js

const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const { isLoggedIn } = require('../middleware');
// We'll need a middleware to protect these routes, but for now we can assume the user is logged in
// In a real app, you would add `isLoggedIn` middleware to each route.

// GET all timetable items for the logged-in user
router.get('/', isLoggedIn, timetableController.getUserTimetable);

// POST a new timetable item
router.post('/', isLoggedIn, timetableController.addTimetableItem);

// DELETE a timetable item by its ID
router.delete('/:id', isLoggedIn, timetableController.deleteTimetableItem);

module.exports = router;