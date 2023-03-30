import  express  from "express";
import { check } from "express-validator";
import validatorErrorChecker from "../middlewares/validator.js";
import userController from "../controllers/userController.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const router = express.Router();

//test route

//Main 영양제 정보 전체 전달
router.post(
    "/dashboard/app",
    //verifyAccessToken,
    userController.userNutrient
);

//로그인
router.post(
    "/login", 
    [
        check("id").exists(),
        check("pw").exists()/*.isLength({min : 8, max : 12})*/,
        validatorErrorChecker
    ],
        userController.login
);

//회원가입
router.post(
    "/signup",
    [
        check("id").exists(),
        check("pw").exists().isLength({min : 8, max : 16}),
        validatorErrorChecker // 발동
    ],
    userController.signup
);

//사욪자 개인 정보 페이지
router.post(
    "/privacy",
    verifyAccessToken
);

//ID 중복 검사
router.post(
    "/signup/check",
    userController.check
);

//email 중복 검사
router.post(
    "/signup/emailCheck",
    userController.emailCheck
);

//username 중복 검사
router.post(
    "/signup/usernameCheck",
    userController.usernameCheck
);

//회원 정보 입력 (삭제 예정)
// router.post(
//     "/signup/info",
//     userController.inputInfo
// );

//로그아웃
router.delete(
    "/logout", verifyAccessToken, userController.logout
);

//회원탈퇴
router.delete(
    "/secede", verifyAccessToken, userController.secede
);

//token 재발급
router.post(
    "/refresh", verifyRefreshToken
);

//refresh 접속 후 다른 페이지 접속해야 재발급 가능?

export default router;