const User = require("../models/User");

async function seedAdmin() {
  const seedFlag = process.env.SEED_ADMIN;
  const enabled =
    seedFlag == null
      ? String(process.env.NODE_ENV || "").toLowerCase() !== "production"
      : String(seedFlag).toLowerCase() === "true";
  if (!enabled) return;

  const email = (process.env.ADMIN_EMAIL || "admin@kicks.com").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const resetPassword = String(process.env.RESET_ADMIN_PASSWORD ?? "false").toLowerCase() === "true";

  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({ name: "Admin", email, password, role: "admin" });
    // eslint-disable-next-line no-console
    console.log(`Seeded admin user: ${email}`);
    return;
  }

  let changed = false;
  if (existing.role !== "admin") {
    existing.role = "admin";
    changed = true;
  }
  if (resetPassword) {
    existing.password = password; // hashed by pre-save hook
    changed = true;
  }

  if (changed) {
    await existing.save();
    // eslint-disable-next-line no-console
    console.log(`Updated admin user: ${email}${resetPassword ? " (password reset)" : ""}`);
  }
}

module.exports = seedAdmin;
