
/* eslint-disable no-console */
import * as admin from 'firebase-admin';
import { program } from 'commander';
import * as dotenv from 'dotenv';
import * as path from 'path';

// --- Environment Variable Loading ---
// We need to find the project root to locate the .env file.
// __dirname in this context is scripts/
const projectRoot = path.resolve(__dirname, '..'); 
const envPath = path.join(projectRoot, '.env');

console.log(`Attempting to load .env file from: ${envPath}`);

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY not found in the loaded environment variables.');
    process.exit(1);
}


// This script is meant to be run from the command line, not in the browser.
// It requires the FIREBASE_SERVICE_ACCOUNT_KEY environment variable to be set.
// Example usage:
// pnpx tsx scripts/setAdmin.ts --email your-email@example.com

// --- Firebase Admin Initialization ---
try {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in the environment.');
  }
  const serviceAccount = JSON.parse(serviceAccountKey);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error: any) {
  console.error('Failed to initialize Firebase Admin SDK.');
  console.error(error.message);
  console.error('Please ensure the FIREBASE_SERVICE_ACCOUNT_KEY environment variable is set correctly in your .env file.');
  process.exit(1);
}

/**
 * Sets a custom 'admin' claim for a Firebase user.
 * @param {string} email The email address of the user to make an admin.
 */
async function setAdminClaim(email: string) {
  if (!email) {
    console.error('Error: Email address is required.');
    program.help();
    return;
  }
  
  try {
    const user = await admin.auth().getUserByEmail(email);
    const currentClaims = user.customClaims || {};

    if (currentClaims.admin === true) {
      console.log(`User <${email}> is already an admin.`);
      return;
    }

    await admin.auth().setCustomUserClaims(user.uid, { ...currentClaims, admin: true });
    console.log(`Successfully set admin claim for user: ${email}`);
    console.log('The user must log out and log back in for the changes to take effect.');
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.error(`Error: User with email "${email}" not found.`);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
    process.exit(1);
  }
}

// --- Command-Line Interface Setup ---
program
  .name('set-admin')
  .description('Set a custom "admin" claim on a Firebase user account.')
  .version('1.0.0');

program
  .command('set')
  .description('Assign the admin role to a user.')
  .requiredOption('-e, --email <string>', 'Email address of the user to make an admin')
  .action((options) => {
    setAdminClaim(options.email);
  });


// --- Main Execution ---
// If no command is specified, or if there are unknown commands, show help.
if (process.argv.length < 3) {
  program.help();
} else {
  program.parse(process.argv);
}
