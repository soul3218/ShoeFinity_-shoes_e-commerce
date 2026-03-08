const mongoose = require("mongoose");

function normalizeMongoUri(rawUri) {
  const mongoUri = String(rawUri || "").trim();
  if (!mongoUri) return mongoUri;

  // Common .env typo: `?appName=foo_NAME=bar` (missing `&DB_NAME=...`)
  const typoFixed = mongoUri.replace(
    /\?appName=([^&]+)_NAME=([^&]+)/,
    (_m, appName, dbName) => `?appName=${appName}&DB_NAME=${dbName}`,
  );

  try {
    const url = new URL(typoFixed);

    const dbFromEnv = String(process.env.DB_NAME || "").trim();
    const dbFromQuery =
      url.searchParams.get("DB_NAME") || url.searchParams.get("db") || url.searchParams.get("database") || "";
    const dbName = dbFromEnv || dbFromQuery;

    url.searchParams.delete("DB_NAME");
    url.searchParams.delete("db");
    url.searchParams.delete("database");

    const hasDbInPath = url.pathname && url.pathname !== "/" && url.pathname !== "";
    if (!hasDbInPath && dbName) url.pathname = `/${dbName}`;

    return url.toString();
  } catch {
    return typoFixed;
  }
}

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  const timeoutFromEnv = Number(process.env.MONGO_TIMEOUT_MS || "");
  const serverSelectionTimeoutMS =
    Number.isFinite(timeoutFromEnv) && timeoutFromEnv >= 1000 ? timeoutFromEnv : 10_000;

  await mongoose.connect(normalizeMongoUri(mongoUri), { serverSelectionTimeoutMS });
  return mongoose.connection;
}

module.exports = connectDB;
