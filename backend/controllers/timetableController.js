const Timetable = require('../models/Timetable');

// Get timetable based on user role
exports.getUserTimetable = async (req, res) => {
    try {
        let timetable;
        // If the logged-in user is a student...
        if (req.user.role === 'student') {
            //...find all classes matching the student's program.
            timetable = await Timetable.find({ program: req.user.program });
        } 
        // If the logged-in user is faculty...
        else if (req.user.role === 'faculty') {
            //...find all classes created by that faculty member.
            timetable = await Timetable.find({ userId: req.user._id });
        } 
        else {
            // If role is undefined, return an empty array
            timetable = [];
        }
        res.status(200).json({ success: true, data: timetable });
    } catch (error) {
        console.error("Error fetching timetable:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Add a new timetable item
exports.addTimetableItem = async (req, res) => {
    try {
        const newItem = new Timetable({
            ...req.body,
            userId: req.user._id // Associate the item with the logged-in user
        });
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to add item' });
    }
};

// Delete a timetable item
exports.deleteTimetableItem = async (req, res) => {
    try {
        const item = await Timetable.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        // Ensure the user owns the timetable item
        if (item.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }
        await item.deleteOne();
        res.status(200).json({ success: true, message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};