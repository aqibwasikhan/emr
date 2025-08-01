import {
  InitiateAuthCommand,
  AuthFlowType,
  InitiateAuthCommandInput,
  RespondToAuthChallengeCommandInput,
  RespondToAuthChallengeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient, awsConfig } from '@/config/aws';
import { generateSecretHash } from '@/lib/utils/crypto/generateSecretHash';
type ResetPasswordMode = 'send-code' | 'confirm-code';
interface ResetPasswordInput {
  mode: ResetPasswordMode;
  email: string;
  code?: string;
  newPassword?: string;
}
export async function loginCognito(email: string, password: string) {
  const secretHash = generateSecretHash(
    email,
    awsConfig.cognitoClientId,
    awsConfig.cognitoClientSecret
  );

  const params: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: awsConfig.cognitoClientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };

  const response = await cognitoClient.send(new InitiateAuthCommand(params));

  return {
    accessToken: response.AuthenticationResult?.AccessToken ?? '',
    idToken: response.AuthenticationResult?.IdToken ?? '',
    refreshToken: response.AuthenticationResult?.RefreshToken ?? '',
    expiresIn: response.AuthenticationResult?.ExpiresIn ?? 3600,
    challengeName: response.ChallengeName ?? '',
    session: response.Session ?? '',
  };
}

export async function respondToNewPasswordChallenge(
  email: string,
  newPassword: string,
  session: string
) {
  const challengeResponses: Record<string, string> = {
    USERNAME: email,
    NEW_PASSWORD: newPassword,
  };

  if (awsConfig.cognitoClientSecret) {
    challengeResponses.SECRET_HASH = generateSecretHash(
      email,
      awsConfig.cognitoClientId,
      awsConfig.cognitoClientSecret
    );
  }

  const params: RespondToAuthChallengeCommandInput = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ClientId: awsConfig.cognitoClientId,
    ChallengeResponses: challengeResponses,
    Session: session,
  };

  try {
    const response = await cognitoClient.send(new RespondToAuthChallengeCommand(params));

    return {
      accessToken: response.AuthenticationResult?.AccessToken ?? '',
      idToken: response.AuthenticationResult?.IdToken ?? '',
      refreshToken: response.AuthenticationResult?.RefreshToken ?? '',
      expiresIn: response.AuthenticationResult?.ExpiresIn ?? 3600,
      challengeName: response.ChallengeName,
      session: response.Session,
    };
  } catch (err: any) {
    console.error('Cognito respondToNewPasswordChallenge failed:', {
      name: err.name,
      message: err.message,
      code: err.code,
    });

    // Optionally throw structured error
    throw new Error(err.message || 'Failed to set new password');
  }
}
export async function resetPassword(payload: ResetPasswordInput): Promise<{
  success: boolean;
  message: string;
  response?: any; // ✅ Return raw response
  errorCode?: string;
}> {
  const { mode, email, code, newPassword } = payload;

  if (!email) {
    return {
      success: false,
      message: 'Email is required.',
    };
  }

  const secretHash = generateSecretHash(
    email,
    awsConfig.cognitoClientId,
    awsConfig.cognitoClientSecret
  );

  if (mode === 'send-code') {
    try {
      const command = new ForgotPasswordCommand({
        ClientId: awsConfig.cognitoClientId,
        Username: email,
        SecretHash: secretHash,
      });

      const response = await cognitoClient.send(command); // ✅ capture response

      return {
        success: true,
        message: 'Verification code sent to your email address.',
        response, // ✅ include raw response
      };
    } catch (err: any) {
      console.error('Cognito ForgotPassword error:', err);
      return {
        success: false,
        message: err.message || 'Failed to send verification code.',
        errorCode: err.name || 'ForgotPasswordError',
      };
    }
  }

  if (mode === 'confirm-code') {
    if (!code || !newPassword) {
      return {
        success: false,
        message: 'Verification code and new password are required.',
      };
    }

    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: awsConfig.cognitoClientId,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
        SecretHash: secretHash,
      });

      const response = await cognitoClient.send(command); // ✅ capture response

      return {
        success: true,
        message: 'Password has been reset successfully.',
        response, // ✅ include raw response
      };
    } catch (err: any) {
      console.error('Cognito ConfirmForgotPassword error:', err);
      return {
        success: false,
        message: err.message || 'Failed to reset password.',
        errorCode: err.name || 'ConfirmForgotPasswordError',
      };
    }
  }

  return {
    success: false,
    message: 'Invalid mode. Use "send-code" or "confirm-code".',
  };
}

