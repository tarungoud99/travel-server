const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://saitarun:8e5i4A4HTabvtj5q@cluster0.ralyv0x.mongodb.net/hobbies?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Create a schema for the travels model
const travelSchema = new mongoose.Schema({
  place: String,
  startDate: Date,
  endDate: Date,
  notes: String,
  imageUrl: String,
});

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

const Travel = mongoose.model('Travel', travelSchema, 'travel');

const app = express();
app.use(express.json());
app.use(cors(corsOptions));


// Get all travels
app.get('/travels', async (req, res) => {
  try {
    const travels = await Travel.find();
    res.json(travels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch travels' });
  }
});

// Get a specific travels by ID
app.get('/travels/:id', async (req, res) => {
  try {
    const travels = await Travel.findById(req.params.id);
    if (!travels) {
      res.status(404).json({ error: 'travels not found' });
    } else {
      res.json(travels);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch travels' });
  }
});

// Create a new travels
app.post('/travels', async (req, res) => {
  try {
    const travels = new Travel(req.body);
    await travels.save();
    res.status(201).json(travels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create travels' });
  }
});

// Update a travels
app.put('/travels/:id', async (req, res) => {
  try {
    const travels = await Travel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!travels) {
      res.status(404).json({ error: 'travels not found' });
    } else {
      res.json(travels);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update travels' });
  }
});

// Delete a travels
app.delete('/travels/:id', async (req, res) => {
  try {
    const travels = await Travel.findByIdAndDelete(req.params.id);
    if (!travels) {
      res.status(404).json({ error: 'travels not found' });
    } else {
      res.json({ message: 'travels deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete travels' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
