// Notification HTTP controller.
// Uses the notification service to list notifications and to **mock-send**
// email, SMS, and push messages for various healthcare flows.

const notificationService = require('../services/notification.service');

exports.listNotifications = async (req, res, next) => {
  try {
    const data = await notificationService.listNotifications();
    res.json({ message: 'List notifications (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.getNotification = async (req, res, next) => {
  try {
    const data = await notificationService.getNotificationById(req.params.id);
    res.json({ message: 'Get notification (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.createNotification = async (req, res, next) => {
  try {
    const data = await notificationService.createNotification(req.body);
    res.json({ message: 'Create notification (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.sendAppointmentReminder = async (req, res, next) => {
  try {
    const data = await notificationService.sendAppointmentReminder(req.body);
    res.json({ message: 'Appointment reminder sent (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.sendMedicationReminder = async (req, res, next) => {
  try {
    const data = await notificationService.sendMedicationReminder(req.body);
    res.json({ message: 'Medication reminder sent (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.sendAbnormalHealthAlert = async (req, res, next) => {
  try {
    const data = await notificationService.sendAbnormalHealthAlert(req.body);
    res.json({ message: 'Abnormal health alert sent (mock)', data });
  } catch (err) {
    next(err);
  }
};
