// backend/routes/circularRoutes.js

const express = require('express');
const router = express.Router();
const Circular = require('../models/Circular');
const { isLoggedIn } = require('../middleware');

// // Middleware to check if user is faculty
// const isFaculty = (req, res, next) => {
//     if (req.isAuthenticated() && req.user.role === 'faculty') {
//         return next();
//     }
//     res.status(403).json({ success: false, message: 'Access denied. Faculty only.' });
// };

// GET all circulars (public for all logged-in users)
router.get('/',isLoggedIn, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Not authenticated' });
    const circulars = await Circular.find().sort({ date: -1 });
    res.json({ success: true, data: circulars });
});

// POST a new circular (faculty only)
router.post('/',isLoggedIn, async (req, res) => {
    const newCircular = new Circular({
        ...req.body,
        createdBy: req.user._id
    });
    await newCircular.save();
    res.status(201).json({ success: true, data: newCircular });
});

// DELETE a circular (faculty only)
router.delete('/:id',isLoggedIn, async (req, res) => {
    await Circular.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Circular deleted' });
});

module.exports = router;