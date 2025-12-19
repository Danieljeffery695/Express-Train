import crypto from "crypto";


// Function to hash a password
export function hashForgetPasswordToken(id: string) {
  // Generate a random salt (16 bytes)
  const saltToken = crypto.randomBytes(16).toString('hex');

  // Use scrypt for password hashing (recommended)
  const hashToken = crypto.scryptSync(id, saltToken, 64).toString('hex');

  // Return both salt and hash for storage
  return { saltToken, hashToken };
}

// Function to verify a password
export function verifyForgetPasswordToken(id: string, salt: string, hash: string) {
  const hashedPassword = crypto.scryptSync(id, salt, 64).toString('hex');
  return hashedPassword === hash;
}
