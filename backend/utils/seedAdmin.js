const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");

const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({ email: "admin@yusratuitionlab.com" });
  if (existingAdmin) {
    return console.log("✅ Admin account already exists.");
  }

  const password = "Admin@123";
  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = new Admin({
    name: "Super Admin",
    email: "admin@yusratuitionlab.com",
    password: hashedPassword,
  });

  await admin.save();
  console.log("✅ Seed admin account created:", {
    email: admin.email,
    password,
  });
};

module.exports = seedAdmin;
