import jwt_utils from "../utils/jwt.js";
import User from "../database/User.js";
import jwt from "jsonwebtoken";

//await 달려 있는 부분은 즉각 실행
// req.headers.authorization 안나옴
const verifyRefreshToken = async (req, res, next) => {

    if (req.headers.authorization && req.headers.refresh) {
        const userAccess = req.headers.authorization;
        const refreshToken = req.headers.refresh;
        const result = jwt_utils.verifyAccessToken(userAccess);
        const decoded = jwt.decode(userAccess).id;
        
        console.log(decoded.id); // jwt access token + refresh token 유무 확인
        
        if (!decoded) {
            return res.json({
                sc: 400,
                msg: "no authorization"
            });
        }
        
        const userId = decoded.id; //why id.id? jwt.js의 verifyAccessToken return에서 id : decoded.id에서 id로 묶이는 바람에 id.id로 나오는데 해결을 할 수가 없음

        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                sc: 400,
                msg: "가입하지 않은 계정"
            });
        }

        const refreshResult = await jwt_utils.verifyRefreshToken(req.headers.refresh, userId);

        if (result.sc === 400) {
            // 1. access token 만료 + refresh token 만료
            if (refreshResult === false) {
                return res.json({
                    sc: 400,
                    msg: "다시 로그인"
                });
            }
            //2. access token 만료 + refresh token 유지 
            else {
                const newToken = jwt_utils.accessToken(userId);
                return res.json({
                    sc: 200,
                    msg: "access token 재발급",
                    accessToken: newToken,
                    refreshToken
                });
            }
        }
        // 3. access token 유지 + refresh token 유지
        else {
            return res.json({
                sc: 400,
                msg: "access token 유지"
            });
        }

    } else {
        return res.json({
            sc: 400,
            msg: "refresh token이 없어 재발급 실패"
        });
    }
};

export default verifyRefreshToken;