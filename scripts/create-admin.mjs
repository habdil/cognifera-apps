// Creates or updates an admin account (upsert by email).
// Usage: npm run admin:create -- <email> <password> [name]
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

try {
  process.loadEnvFile(".env");
} catch {
  // .env optional — DATABASE_URL may come from the environment
}

const [email, password, name = "Admin"] = process.argv.slice(2);

if (!email || !password) {
  console.error('Usage: npm run admin:create -- <email> <password> "[name]"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);
const sql = neon(databaseUrl);

await sql`
  INSERT INTO admin_users (email, password_hash, name)
  VALUES (${email.toLowerCase()}, ${passwordHash}, ${name})
  ON CONFLICT (email) DO UPDATE
    SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name;
`;

console.log(`Admin account ready: ${email.toLowerCase()}`);
