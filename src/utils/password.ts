import * as bcrypt from "bcrypt";

// function to encode a password using bcrypt
export const encodepassword = async (passwordToEncode: string): Promise<string> => {
    // Generate a salt using bcrypt with a cost factor of 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordToEncode, salt);
    return hashedPassword;
};

// function to verify a password against a hashed password stored in the database
export const passwordVerification = async (passwordToVerify: string, dbPassword: string): Promise<boolean> => {
    // Use bcrypt to compare the provided password with the hashed password from the database
    const verifyingPassword = await bcrypt.compare(passwordToVerify, dbPassword);
    return verifyingPassword;
};