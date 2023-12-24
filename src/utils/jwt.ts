import * as jwt from "jsonwebtoken";

export interface JwtUserLoginType {
  name: string;
  email: string;
  id: string;
}

export const verify = (
  token: string,
  cb: (error: Error, decoded: JwtUserLoginType) => void
) => {
  jwt.verify(token, process.env.JWT_SECRET, function (err: Error, decoded: JwtUserLoginType) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, decoded);
    }
  });
};

export const verifyAsync = (token: string): Promise<JwtUserLoginType> =>
  new Promise((res, rej) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err: Error, decoded: { data: JwtUserLoginType }) {
        if (err) {
          rej(err);
        } else {
          res(decoded.data);
        }
      }
    );
  });

export const generateJwtToken = (data: JwtUserLoginType) => {
  let token: string = jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TIMEOUT,
    }
  );
  return token;
};
