const speakeasy = require('speakeasy');

/* 
  密鑰編碼可使用secret.ascii, secret.hex, and secret.base32
  Google Authenticator使用secret.ascii
 */
export const generateSecret = (): string => {
  const secret = speakeasy.generateSecret();
  return secret.ascii;
};

export const generateOtpauth = (
  secret: string,
  user: string,
  service: string,
): string => {
  const url = speakeasy.otpauthURL({
    secret,
    label: `${service}:${user}`,
    algorithm: 'sha256',
  });
  return url;
};
export const check = (secret: string, token: string): boolean => {
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'ascii',
    algorithm: 'sha256',
    token,
  });
  return verified;
};

export function generateTOTP(
  secret: string,
  algorithm = 'sha256',
  windowSize = 30,
  digits = 6,
) {
  const totp = speakeasy.totp({
    secret,
    encoding: 'ascii',
    window: windowSize,
    digits,
    algorithm,
  });
  return totp;
}
