import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisClient from "./redis.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const jwt_utils = {

    //access token 발급
    accessToken : (id) => {
        //expiresIn = "1h" == 60 * 60 (초 단위)
        const token = jwt.sign({ id : id }, secretKey, { expiresIn : 60 * 60 });
        return token;
    },

    //refresh token 발급
    refreshToken : () => {
        const token = jwt.sign({}, secretKey, {
            //payload엔 정보가 들어있어서 없이
            expiresIn : 60 * 60 * 2,
            algorithm: "HS256"
        });
        return token;
    },

    //access token 유효성 검사
    verifyAccessToken : (token) => { 
        try {
            const decoded = jwt.verify(token, secretKey);

            return {
                 sc : 200,
                  id : decoded.id
            };
        } catch (err) {
            return {
                sc : 400,
                msg: err
            };
        }
    },

    //refresh token 유효성 검사
    verifyRefreshToken : async (token, id) => {
        try {
            const getRefreshToken = await redisClient.get(id);
            if(token === getRefreshToken) {
                try {
                    jwt.verify(token, secretKey);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

};

export default jwt_utils;