const speakeasy = require('speakeasy');

/* 
  密鑰編碼可使用secret.ascii, secret.hex, and secret.base32
  Google Authenticator使用secret.ascii
 */
export const generateSecret = (): string => {
  var secret = speakeasy.generateSecret();
  return secret.ascii;
};

export const generateOtpauth = (
  secret: string,
  user: string,
  service: string
): string => {
  var url = speakeasy.otpauthURL({
    secret: secret,
    label: `${service}:${user}`,
    algorithm: 'sha256',
  });
  return url;
};
export const check = (secret: string, token: string): boolean => {
  var verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'ascii',
    algorithm: 'sha256',
    token: token,
  });
  return verified;
};

export function generateTOTP(
  secret: string,
  algorithm = 'sha256',
  windowSize = 30,
  digits = 6
) {
  const totp = speakeasy.totp({
    secret: secret,
    encoding: 'ascii',
    window: windowSize,
    digits: digits,
    algorithm: algorithm,
  });
  return totp;
}
