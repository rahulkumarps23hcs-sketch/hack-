const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock Data Store
const mockData = {
    status: 'System Operational',
    version: '1.0.0'
};

// Base Route
app.get('/', (req, res) => {
    res.json(mockData);
});

/* 
  TODO: Add Routes
  - /api/auth
  - /api/patients
  - /api/doctors
  - /api/analytics
*/

app.listen(port, () => {
    console.log(`Backend Server running on port ${port}`);
});
