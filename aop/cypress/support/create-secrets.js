import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, "secrets.js");

if (fs.existsSync(file)) {
  console.log("cypress secrets file found; no action required");
} else {
  console.log("cypress secrets file not found, generating...");

  const contents = `export const secrets = {
  username: "", // replace with actual values, do not commit this file
  password: "",
};
`;

  fs.writeFileSync(file, contents);

  console.log("cypress secrets generated; see /cypress/support/secrets.js to add values");
}
