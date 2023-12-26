import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';

const publicKeyPath = path.join(__dirname, '../../rsakeys/public.pem');
const privateKeyPath = path.join(__dirname, '../../rsakeys/private.pem');
const publicKey = fs.readFileSync(publicKeyPath, 'utf-8') || null;
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8') || null;
// Define the structure of the JWT payload for user login
export interface JwtUserLoginType {
  name: string;
  email: string;
  id: string;
}

// Async function to verify a JWT token and extract the user data
// For other API Use not in scope of assessmment, can be used in middlewares to other APIs
export const verifyAsync = (token: string): Promise<JwtUserLoginType> =>
  new Promise((res, rej) => {
    jwt.verify(
      token,
      publicKey || process.env.RSA_PUBLIC_KEY, // Secret key used for JWT verification
      function (err: Error, decoded: { data: JwtUserLoginType }) {
        if (err) {
          rej(err); // Reject the promise if there's an error during verification
        } else {
          res(decoded.data); // Resolve the promise with the decoded user data
        }
      },
    );
  });

// Function to generate a new JWT token based on user data
export const generateJwtToken = (data: JwtUserLoginType) => {
  // Generate a new JWT token using the provided user data and secret key
  let token: string = jwt.sign(
    {
      data,
    },
    privateKey || process.env.RSA_PRIVATE_KEY, // Secret key used for JWT signing
    {
      algorithm: 'RS256', //  RSA algorithm
      expiresIn: process.env.JWT_TIMEOUT, // Expiration time for the token
    },
  );
  return token; // Return the generated JWT token
};
