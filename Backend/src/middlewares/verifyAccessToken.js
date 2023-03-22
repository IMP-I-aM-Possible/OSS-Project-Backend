import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAccessToken = async (req, res, next) => {
    // console.log(req.headers.authorization);
    // console.log(req.body.id);
    try {
        if(!req.headers.authorization) {
            return res.json({
                sc : 400,
                msg : "no Token"
            });
        } else {
            const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);

            const userId = decoded.id;

            console.log(req.body);

            if(userId.id !== req.body.id) {
                req.body.id = undefined;
                next();
            }

            req.body = userId;
            
            next();
        }
    } catch (err) {
        res.status(401).json({ // 토큰이 일치하지 않으면
            code: 401,
            message: "유효하지 않은 토큰",
            err
        });
        next(err);
    }
};

export default verifyAccessToken;