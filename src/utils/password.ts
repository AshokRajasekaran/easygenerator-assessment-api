import * as bcrypt from "bcrypt";

export const encodepassword = async (passwordToEncode: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordToEncode, salt);
    return hashedPassword;
};

export const passwordVerification = async (passwordToVerify: string, dbPassword: string): Promise<boolean> => {
    const verifyingPassword = await bcrypt.compare(passwordToVerify, dbPassword);
    return verifyingPassword;
};
