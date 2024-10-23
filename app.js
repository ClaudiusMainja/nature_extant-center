const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentRegistration', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Schema for Student
const studentSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: String,
  country: String,
  program: String,
  documents: [String],
});

// Model for the Schema
const Student = mongoose.model('Student', studentSchema);

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Set up Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with current timestamp to avoid name clashes
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Max file size 5MB
});

// Route to Handle Form Submission
app.post('/submit-registration', upload.array('documents', 5), async (req, res) => {
  try {
    const { fullName, phone, email, country, program } = req.body;
    const documents = req.files.map(file => file.filename);

    // Create new student entry
    const newStudent = new Student({ fullName, phone, email, country, program, documents });
    await newStudent.save();

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting registration', error });
  }
});

// Start the Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
