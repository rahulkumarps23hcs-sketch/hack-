// Notification routes.
// Provides endpoints for listing notifications and triggering **mock**
// appointment reminders, medication reminders, and abnormal health alerts.

const express = require('express');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

// GET /api/notifications
router.get('/', notificationController.listNotifications);

// GET /api/notifications/:id
router.get('/:id', notificationController.getNotification);

// POST /api/notifications
router.post('/', notificationController.createNotification);

// POST /api/notifications/appointment-reminder
router.post('/appointment-reminder', notificationController.sendAppointmentReminder);

// POST /api/notifications/medication-reminder
router.post('/medication-reminder', notificationController.sendMedicationReminder);

// POST /api/notifications/abnormal-health-alert
router.post('/abnormal-health-alert', notificationController.sendAbnormalHealthAlert);

module.exports = router;
