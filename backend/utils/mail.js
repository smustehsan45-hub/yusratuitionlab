const nodemailer = require("nodemailer");

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "yusratuitionlab@gmail.com";

const getEmailPass = () => (process.env.EMAIL_PASS || "").replace(/\s/g, "");

const isMailConfigured = () => Boolean(process.env.EMAIL_USER && getEmailPass());

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: getEmailPass(),
    },
  });

const formatTimestamp = (date = new Date()) =>
  date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }) + " UTC";

const buildAuthActivityHtml = ({ event, role, email, name, ipAddress, timestamp }) => {
  const action = event === "login" ? "Logged in" : "Logged out";
  return `
    <h2>Auth activity: ${action}</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Action</strong></td><td>${action}</td></tr>
      <tr><td><strong>Role</strong></td><td>${role}</td></tr>
      <tr><td><strong>Name</strong></td><td>${name || "N/A"}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Time</strong></td><td>${timestamp}</td></tr>
      <tr><td><strong>IP address</strong></td><td>${ipAddress}</td></tr>
    </table>
  `;
};

const buildApplicationWordContent = ({
  name,
  email,
  phone,
  roleRequested,
  currentRole,
  selectedCourses,
  experience,
  bio,
  message,
  timestamp,
  ipAddress,
}) => {
  const courses = selectedCourses?.length > 0 ? selectedCourses.join("\n") : "None selected";
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Application Profile</title>
  </head>
  <body>
    <h1>Join Us Application</h1>
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tr><td><strong>Applying as</strong></td><td>${roleRequested || "N/A"}</td></tr>
      <tr><td><strong>Name</strong></td><td>${name || "N/A"}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email || "N/A"}</td></tr>
      <tr><td><strong>Current account role</strong></td><td>${currentRole || "N/A"}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr>
      <tr><td><strong>Selected courses</strong></td><td><pre style="white-space: pre-wrap;">${courses}</pre></td></tr>
      ${roleRequested === "tutor" ? `<tr><td><strong>Experience</strong></td><td>${experience || "N/A"}</td></tr>` : ""}
      ${roleRequested === "tutor" ? `<tr><td><strong>Bio</strong></td><td>${bio || "N/A"}</td></tr>` : ""}
      <tr><td><strong>Message</strong></td><td>${message || "N/A"}</td></tr>
      <tr><td><strong>Submitted at</strong></td><td>${timestamp || "N/A"}</td></tr>
      <tr><td><strong>IP address</strong></td><td>${ipAddress || "N/A"}</td></tr>
    </table>
  </body>
</html>`;
};

const buildApplicationWordAttachment = (details) => ({
  filename: `${details.name?.trim().replace(/\s+/g, "_").replace(/[^\w\-_.]/g, "") || "application"}_${details.roleRequested || "profile"}.doc`,
  content: Buffer.from(buildApplicationWordContent(details), "utf-8"),
  contentType: "application/msword",
});

const sendMail = async ({ to, subject, html, text, attachments }) => {
  if (!isMailConfigured()) {
    console.warn("Email not sent: EMAIL_USER and EMAIL_PASS must be set.");
    return;
  }

  const transport = createTransporter();
  try {
    const info = await transport.sendMail({
      from: `"Yusra Tuition Lab" <${process.env.EMAIL_USER}>`,
      to: to || NOTIFY_EMAIL,
      subject,
      html,
      text,
      attachments,
    });
    console.log(`Email sent (${subject}) → ${to || NOTIFY_EMAIL}: ${info.messageId}`);
    return info;
  } finally {
    transport.close();
  }
};

const sendAuthActivityNotification = async ({ event, role, email, name, ipAddress, timestamp }) => {
  const action = event === "login" ? "Login" : "Logout";
  const formattedTime = formatTimestamp(timestamp ? new Date(timestamp) : new Date());

  const subject = `[YTL] ${action} — ${role} (${email}) — ${formattedTime}`;
  const html = buildAuthActivityHtml({
    event,
    role,
    email,
    name,
    ipAddress,
    timestamp: formattedTime,
  });
  const text = [
    `Auth activity: ${action}`,
    `Role: ${role}`,
    `Name: ${name || "N/A"}`,
    `Email: ${email}`,
    `Time: ${formattedTime}`,
    `IP address: ${ipAddress}`,
  ].join("\n");

  await sendMail({ subject, html, text });
};

const runInBackground = (task, errorLabel) => {
  Promise.resolve()
    .then(task)
    .catch((err) => {
      console.error(`${errorLabel}:`, err.message);
    });
};

const notifyAuthActivity = ({ event, role, email, name, ipAddress }) => {
  if (!role || !email) return;

  runInBackground(
    () =>
      sendAuthActivityNotification({
        event,
        role,
        email,
        name,
        ipAddress,
        timestamp: new Date(),
      }),
    `Failed to send ${event} notification email`
  );
};

const buildApplicationHtml = ({
  name,
  email,
  phone,
  roleRequested,
  currentRole,
  selectedCourses,
  experience,
  bio,
  message,
  ipAddress,
  timestamp,
}) => {
  const courses =
    selectedCourses?.length > 0 ? selectedCourses.join(", ") : "None selected";
  return `
    <h2>New Join Us application</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Applying as</strong></td><td>${roleRequested}</td></tr>
      <tr><td><strong>Applicant name</strong></td><td>${name || "N/A"}</td></tr>
      <tr><td><strong>Applicant email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Current account role</strong></td><td>${currentRole || "N/A"}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr>
      <tr><td><strong>Courses</strong></td><td>${courses}</td></tr>
      ${roleRequested === "tutor" ? `<tr><td><strong>Experience</strong></td><td>${experience || "N/A"}</td></tr>` : ""}
      ${roleRequested === "tutor" ? `<tr><td><strong>Bio</strong></td><td>${bio || "N/A"}</td></tr>` : ""}
      <tr><td><strong>Message</strong></td><td>${message || "N/A"}</td></tr>
      <tr><td><strong>Submitted at</strong></td><td>${timestamp}</td></tr>
      <tr><td><strong>IP address</strong></td><td>${ipAddress}</td></tr>
    </table>
  `;
};

const sendApplicationNotification = async ({
  name,
  email,
  phone,
  roleRequested,
  currentRole,
  selectedCourses,
  experience,
  bio,
  message,
  ipAddress,
  timestamp,
}) => {
  const formattedTime = formatTimestamp(timestamp ? new Date(timestamp) : new Date());
  const courses =
    selectedCourses?.length > 0 ? selectedCourses.join(", ") : "None selected";

  const subject = `[YTL] Application — ${roleRequested} (${email}) — ${formattedTime}`;
  const html = buildApplicationHtml({
    name,
    email,
    phone,
    roleRequested,
    currentRole,
    selectedCourses,
    experience,
    bio,
    message,
    ipAddress,
    timestamp: formattedTime,
  });
  const text = [
    "New Join Us application",
    `Applying as: ${roleRequested}`,
    `Applicant name: ${name || "N/A"}`,
    `Applicant email: ${email}`,
    `Current account role: ${currentRole || "N/A"}`,
    `Phone: ${phone || "N/A"}`,
    `Courses: ${courses}`,
    ...(roleRequested === "tutor"
      ? [`Experience: ${experience || "N/A"}`, `Bio: ${bio || "N/A"}`]
      : []),
    `Message: ${message || "N/A"}`,
    `Submitted at: ${formattedTime}`,
    `IP address: ${ipAddress}`,
  ].join("\n");

  await sendMail({
    subject,
    html,
    text,
    attachments: [buildApplicationWordAttachment({
      name,
      email,
      phone,
      roleRequested,
      currentRole,
      selectedCourses,
      experience,
      bio,
      message,
      timestamp: formattedTime,
      ipAddress,
    })],
  });
};

const notifyApplicationSubmitted = (details) => {
  if (!details?.email || !details?.roleRequested) return;

  runInBackground(
    () => sendApplicationNotification(details),
    "Failed to send application notification email"
  );
};

const sendApplicationDecisionEmail = async ({
  status,
  name,
  email,
  roleRequested,
  selectedCourses,
  tempPassword,
  note,
}) => {
  const formattedTime = formatTimestamp(new Date());
  const courses =
    selectedCourses?.length > 0 ? selectedCourses.join(", ") : "None selected";
  const isApproved = status === "approved";
  const statusLabel = isApproved ? "Approved" : "Rejected";

  let bodyExtra = "";
  let textExtra = "";

  if (isApproved) {
    if (tempPassword) {
      bodyExtra = `
        <p>Your application has been <strong>approved</strong>. A new account was created for you.</p>
        <p><strong>Temporary password:</strong> ${tempPassword}</p>
        <p>Please sign in and change your password as soon as possible.</p>
      `;
      textExtra = [
        "Your application has been approved. A new account was created for you.",
        `Temporary password: ${tempPassword}`,
        "Please sign in and change your password as soon as possible.",
      ].join("\n");
    } else {
      bodyExtra = `
        <p>Your application has been <strong>approved</strong>. Your existing account has been updated.</p>
        <p>Please sign in with your current email and password.</p>
      `;
      textExtra = [
        "Your application has been approved. Your existing account has been updated.",
        "Please sign in with your current email and password.",
      ].join("\n");
    }
  } else {
    bodyExtra = `
      <p>Unfortunately, your application has been <strong>rejected</strong>.</p>
      ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}
      <p>If you have questions, please contact Yusra Tuition Lab.</p>
    `;
    textExtra = [
      "Unfortunately, your application has been rejected.",
      ...(note ? [`Note: ${note}`] : []),
      "If you have questions, please contact Yusra Tuition Lab.",
    ].join("\n");
  }

  const subject = `[YTL] Application ${statusLabel} — ${roleRequested} — ${formattedTime}`;
  const html = `
    <h2>Application ${statusLabel}</h2>
    <p>Dear ${name || "Applicant"},</p>
    ${bodyExtra}
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-top: 16px;">
      <tr><td><strong>Applied as</strong></td><td>${roleRequested}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Courses</strong></td><td>${courses}</td></tr>
      <tr><td><strong>Decision time</strong></td><td>${formattedTime}</td></tr>
    </table>
    <p style="margin-top: 16px;">Thank you,<br/>Yusra Tuition Lab</p>
  `;
  const text = [
    `Application ${statusLabel}`,
    `Dear ${name || "Applicant"},`,
    "",
    textExtra,
    "",
    `Applied as: ${roleRequested}`,
    `Email: ${email}`,
    `Courses: ${courses}`,
    `Decision time: ${formattedTime}`,
    "",
    "Thank you,",
    "Yusra Tuition Lab",
  ].join("\n");

  await sendMail({ to: email, subject, html, text });
};

const notifyApplicationDecision = async (details) => {
  if (!details?.email || !details?.status) return;

  try {
    await sendApplicationDecisionEmail(details);
  } catch (err) {
    console.error("Failed to send application decision email:", err.message);
  }
};

module.exports = {
  sendMail,
  sendAuthActivityNotification,
  notifyAuthActivity,
  sendApplicationNotification,
  notifyApplicationSubmitted,
  sendApplicationDecisionEmail,
  notifyApplicationDecision,
  isMailConfigured,
};
