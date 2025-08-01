'use server';

import { encryptData, decryptData } from '@/lib/utils/crypto/crypto';
const encryptKeyName = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
/**
 * Generic decryptor for any encrypted base64 string using a named key or default
 */
export async function decryptValue<T = any>(encryptedValue: string, keyOverride?: string): Promise<T> {
  const key = keyOverride || encryptKeyName;

  if (!key) {
    throw new Error('Missing encryption key');
  }

  const safeValue = decodeURIComponent(encryptedValue.replace(/ /g, '+'));
  return decryptData(safeValue, key);
}

/**
 * Generic encryptor for any data object using a named key or default
 */
export async function encryptValue(data: object, keyOverride?: string): Promise<string> {
  const key = keyOverride || encryptKeyName;

  if (!key) {
    throw new Error('Missing encryption key');
  }

  const encrypted = encryptData(data, key);
  return encodeURIComponent(encrypted); // safe for embedding in URLs
}
