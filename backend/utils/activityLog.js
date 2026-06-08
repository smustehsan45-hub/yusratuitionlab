const Activity = require("../models/activity.model");
const Application = require("../models/application.model");

const logActivity = ({ type, name, email, role, applicationId }) => {
  Activity.create({
    type,
    name: name || "Unknown",
    email: email || "",
    role: role || "user",
    applicationId: applicationId || null,
  }).catch((err) => {
    console.error("Failed to log activity:", err.message);
  });
};

const buildActivityMessage = (item) => {
  if (item.type === "login") {
    return `${item.name} (${item.role}) logged in`;
  }
  if (item.type === "logout") {
    return `${item.name} (${item.role}) logged out`;
  }
  if (item.type === "application") {
    return `${item.name} applied as ${item.role}`;
  }
  return item.message || "Activity recorded";
};

const getRecentActivity = async (limit = 5) => {
  const logged = await Activity.find()
    .sort({ createdAt: -1 })
    .limit(limit * 2)
    .lean();

  const loggedApplicationIds = new Set(
    logged
      .filter((item) => item.type === "application" && item.applicationId)
      .map((item) => item.applicationId.toString())
  );

  const legacyApplications = await Application.find({
    ...(loggedApplicationIds.size
      ? { _id: { $nin: [...loggedApplicationIds] } }
      : {}),
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const fromApplications = legacyApplications.map((app) => ({
    type: "application",
    name: app.name,
    email: app.email,
    role: app.roleRequested,
    createdAt: app.createdAt,
  }));

  const combined = [...logged, ...fromApplications]
    .map((item) => ({
      type: item.type,
      name: item.name,
      email: item.email,
      role: item.role,
      message: buildActivityMessage(item),
      createdAt: item.createdAt,
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

  return combined;
};

module.exports = {
  logActivity,
  getRecentActivity,
  buildActivityMessage,
};
