import dotenv from "dotenv";
dotenv.config();


if (!process.env.JWT_USER_PASSWORD) {
    throw new Error('JWT_USER_PASSWORD is not defined in the environment variables');
}

if (!process.env.JWT_ADMIN_PASSWORD) {
    throw new Error('JWT_ADMIN_PASSWORD is not defined in the environment variables');
}

export const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
export const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;