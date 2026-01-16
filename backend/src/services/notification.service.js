// Notification service layer.
// Handles listing notifications and **mock** sending via email, SMS, and push.
// No real external providers are called – everything is simulated for demos.

const { notifications } = require('../models/notification.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function listNotifications() {
  // For now simply return all in-memory notifications.
  return notifications;
}

async function getNotificationById(id) {
  return notifications.find((n) => n.id === id) || null;
}

async function createNotification(payload) {
  const notification = {
    id: generateId('notif'),
    userId: payload.userId || null,
    type: payload.type || 'GENERIC',
    message: payload.message || '',
    read: false,
    createdAt: new Date().toISOString(),
  };

  notifications.push(notification);
  return notification;
}

// --- Mock channel helpers ---------------------------------------------------

function mockChannelResponse(kind) {
  return {
    channel: kind,
    status: 'sent',
    mock: true,
    provider: `mock-${kind}-provider`,
    timestamp: new Date().toISOString(),
  };
}

function buildMockSendResult(notification) {
  return {
    notification,
    channels: {
      email: mockChannelResponse('email'),
      sms: mockChannelResponse('sms'),
      push: mockChannelResponse('push'),
    },
  };
}

// --- High-level mocked flows -----------------------------------------------

async function sendAppointmentReminder(payload) {
  const when = payload.datetime || payload.time || 'the scheduled time';
  const baseMessage =
    payload.message || `Appointment reminder: you have an appointment at ${when}.`;

  const notification = await createNotification({
    userId: payload.userId,
    type: 'APPOINTMENT_REMINDER',
    message: baseMessage,
  });

  return buildMockSendResult(notification);
}

async function sendMedicationReminder(payload) {
  const med = payload.medicationName || 'your medication';
  const when = payload.time || 'the scheduled time';
  const baseMessage =
    payload.message || `Medication reminder: take ${med} around ${when}.`;

  const notification = await createNotification({
    userId: payload.userId,
    type: 'MEDICATION_REMINDER',
    message: baseMessage,
  });

  return buildMockSendResult(notification);
}

async function sendAbnormalHealthAlert(payload) {
  const metricType = payload.metricType || 'health metric';
  const value =
    payload.value !== undefined
      ? JSON.stringify(payload.value)
      : 'an abnormal value';
  const baseMessage =
    payload.message || `Alert: abnormal ${metricType} detected (value: ${value}).`;

  const notification = await createNotification({
    userId: payload.userId,
    type: 'ABNORMAL_HEALTH_ALERT',
    message: baseMessage,
  });

  return buildMockSendResult(notification);
}

module.exports = {
  listNotifications,
  getNotificationById,
  createNotification,
  sendAppointmentReminder,
  sendMedicationReminder,
  sendAbnormalHealthAlert,
};
