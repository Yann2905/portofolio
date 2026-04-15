import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run hash -- \"votre-mot-de-passe\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
// Échapper les $ pour éviter l'expansion de variables par dotenv-expand
const escaped = hash.replace(/\$/g, "\\$");
console.log("\nHash bcrypt (copiez la ligne ci-dessous dans .env.local) :\n");
console.log(`ADMIN_PASSWORD_HASH=${escaped}\n`);
