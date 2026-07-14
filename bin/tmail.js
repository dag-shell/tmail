#!/usr/bin/env node

const { TempMail } = require("tempmail.lol");
const fs = require("fs");
const os = require("os");
const path = require("path");

const tmail = new TempMail();

const CONFIG_FILE = path.join(os.homedir(), ".tmail.json");

function saveInbox(inbox) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(inbox, null, 2));
}

function loadInbox() {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
}

async function watchInbox(inbox) {
  console.log(`📧 Email : ${inbox.address}`);
  console.log(`🔑 Token : ${inbox.token}`);
  console.log("\nWatching inbox... (Ctrl+C to stop)\n");

  const seen = new Set();

  while (true) {
    try {
      const emails = await tmail.checkInbox(inbox.token);

      if (emails && emails.length) {
        for (const email of emails) {
          const id =
            email.id ??
            `${email.from}-${email.subject}-${email.date ?? email.body}`;

          if (seen.has(id)) continue;
          seen.add(id);

          console.log("=".repeat(60));
          console.log(`From    : ${email.from}`);
          console.log(`Subject : ${email.subject}`);
          console.log(`Date    : ${email.date || "Unknown"}`);
          console.log("-".repeat(60));
          console.log(email.body);

          console.log("=".repeat(60));
          console.log();
        }
      }
    } catch (err) {
      console.error("❌", err.message);
    }

    await new Promise((r) => setTimeout(r, 5000));
  }
}


async function main() {
  const cmd = process.argv[2];

  if (cmd === "resume") {
    const inbox = loadInbox();

    if (!inbox) {
      console.error("No saved inbox found.");
      process.exit(1);
    }

    console.log("Resuming previous inbox...\n");

    try {
      await watchInbox(inbox);
    } catch (err) {
      console.error(
        "\nUnable to resume. The inbox may have expired or the token is invalid."
      );
      process.exit(1);
    }

    return;
  }

  const inbox = await tmail.createInbox();
  saveInbox(inbox);

  console.log("Created new temporary email.\n");
  await watchInbox(inbox);
}

main().catch(console.error);