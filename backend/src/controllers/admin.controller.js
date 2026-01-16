// Admin HTTP controller (placeholder).

const adminService = require('../services/admin.service');

exports.getSystemOverview = async (req, res, next) => {
  try {
    const data = await adminService.getSystemOverview();
    res.json({ message: 'Admin system overview placeholder', data });
  } catch (err) {
    next(err);
  }
};
