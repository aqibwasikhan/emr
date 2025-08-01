
import crypto from 'crypto';
const encryption_key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
export function encryptData(data: object, password: string = encryption_key): string {
  const dataBuffer = Buffer.from(JSON.stringify(data), 'utf8');

  const encryptionSalt = crypto.randomBytes(8);
  const hmacSalt = crypto.randomBytes(8);
  const iv = crypto.randomBytes(16);

  const encryptionKey = crypto.pbkdf2Sync(password, encryptionSalt, 10000, 32, 'sha1');
  const hmacKey = crypto.pbkdf2Sync(password, hmacSalt, 10000, 32, 'sha1');

  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(dataBuffer);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const header = Buffer.concat([Buffer.from([3, 1]), encryptionSalt, hmacSalt, iv]);

  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(Buffer.concat([header, encrypted]));
  const hmacValue = hmac.digest();

  return Buffer.concat([header, encrypted, hmacValue]).toString('base64');
}

export function decryptData(encryptedData: string, password: string): any {
  const encryptedBuffer = Buffer.from(encryptedData, 'base64');

  const versionAndOptions = encryptedBuffer.subarray(0, 2);
  const encryptionSalt = encryptedBuffer.subarray(2, 10);
  const hmacSalt = encryptedBuffer.subarray(10, 18);
  const iv = encryptedBuffer.subarray(18, 34);
  const encrypted = encryptedBuffer.subarray(34, -32);
  const hmacValue = encryptedBuffer.subarray(-32);

  if (versionAndOptions[0] !== 3 || versionAndOptions[1] !== 1) {
    throw new Error('Unsupported encryption version or format');
  }

  const encryptionKey = crypto.pbkdf2Sync(password, encryptionSalt, 10000, 32, 'sha1');
  const hmacKey = crypto.pbkdf2Sync(password, hmacSalt, 10000, 32, 'sha1');

  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(Buffer.concat([versionAndOptions, encryptionSalt, hmacSalt, iv, encrypted]));
  const computedHmac = hmac.digest();

  if (!crypto.timingSafeEqual(computedHmac, hmacValue)) {
    throw new Error('HMAC validation failed');
  }

  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  try {
    return JSON.parse(decrypted.toString('utf8'));
  } catch {
    throw new Error('Failed to parse decrypted data');
  }
}