import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { S3Client } from '@aws-sdk/client-s3';
import { Credentials } from '@aws-sdk/types';

// --- Centralized AWS Config ---
export const awsConfig = {
  region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  cognitoClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  cognitoClientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!,
  cognitoUserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  s3Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!
};

// --- Cognito Client (User Pool Auth) ---
export const cognitoClient = new CognitoIdentityProviderClient({
  region: awsConfig.region
});

// --- S3 Client Setup ---
let s3Client: S3Client | null = null;

export function createS3Client(tempCreds: Credentials) {
  s3Client = new S3Client({
    region: awsConfig.region,
    credentials: tempCreds
  });
  return s3Client;
}

export function getS3Client(): S3Client {
  if (!s3Client) {
    throw new Error('S3 Client not initialized.');
  }
  return s3Client;
}
