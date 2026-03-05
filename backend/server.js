require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// RSVP Schema
const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  attending: { type: String, enum: ['yes', 'no', 'maybe'], required: true },
  guests: { type: Number, default: 1, min: 1, max: 10 },
  dietaryRestrictions: { type: String, trim: true },
  message: { type: String, trim: true },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const RSVP = mongoose.model('RSVP', rsvpSchema);

// Routes
// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, email, phone, attending, guests, dietaryRestrictions, message } = req.body;
    
    if (!name || !email || !attending) {
      return res.status(400).json({ error: 'Name, email, and attendance status are required.' });
    }

    // Check if email already submitted
    const existing = await RSVP.findOne({ email });
    if (existing) {
      // Update existing
      Object.assign(existing, { name, phone, attending, guests, dietaryRestrictions, message });
      await existing.save();
      return res.json({ success: true, message: 'RSVP updated successfully!', updated: true });
    }

    const rsvp = new RSVP({ name, email, phone, attending, guests, dietaryRestrictions, message });
    await rsvp.save();
    res.status(201).json({ success: true, message: 'RSVP submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit RSVP. Please try again.' });
  }
});

// Get all RSVPs (admin)
app.get('/api/admin/rsvps', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== (process.env.ADMIN_KEY || 'abhijith-kelsey-2025')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    const stats = {
      total: rsvps.length,
      attending: rsvps.filter(r => r.attending === 'yes').length,
      notAttending: rsvps.filter(r => r.attending === 'no').length,
      maybe: rsvps.filter(r => r.attending === 'maybe').length,
      totalGuests: rsvps.filter(r => r.attending === 'yes').reduce((sum, r) => sum + (r.guests || 1), 0)
    };
    
    res.json({ rsvps, stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch RSVPs.' });
  }
});

// Delete RSVP (admin)
app.delete('/api/admin/rsvps/:id', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== (process.env.ADMIN_KEY || 'abhijith-kelsey-2025')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await RSVP.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete.' });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
