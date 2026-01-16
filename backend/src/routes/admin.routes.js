// Admin routes (placeholder).

const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// GET /api/admin/overview
router.get('/overview', adminController.getSystemOverview);

module.exports = router;
