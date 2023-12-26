import * as jwt from 'jsonwebtoken';

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
      process.env.RSA_PUBLIC_KEY, // Secret key used for JWT verification
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
    process.env.RSA_PRIVATE_KEY, // Secret key used for JWT signing
    {
      algorithm: 'RS256', //  RSA algorithm
      expiresIn: process.env.JWT_TIMEOUT, // Expiration time for the token
    },
  );
  return token; // Return the generated JWT token
};
