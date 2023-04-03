import User from '../database/User.js';
import Nutritional from '../database/Nutritional.js';
import nutrientFunction from '../functions/nutrientFunction.js';
import jwt_utils from '../utils/jwt.js';
/* import redisClient from '../utils/redis.js'; */
import bcrypt from "bcrypt";


const userService = {

    login: async (body) => {

        const response = await User.login(body.id);

        if(response.expired_at != null) {
            return { 
                sc : 200,
                msg : "회원탈퇴 계정"
            }
        }

        if (response) {
            if (await bcrypt.compare(body.pw, response.pw)) {

                const accessToken = jwt_utils.accessToken(response);
                const refreshToken = jwt_utils.refreshToken();
                redisClient.SETEX(response.id, 3600, refreshToken);

                const { id, username } = response;

                return {
                    sc: 200,
                    id,
                    username,
                    accessToken,
                    refreshToken
                };
            } else {
                return { sc: 400 };
            };
        } else return { sc: 400 };
    },

    signup: async (body) => {

        const bcryptPw = await bcrypt.hash(body.pw, 10);
        body.pw = bcryptPw;

        //id, nickname 중복 값 처리
        const findId = await User.findById(body.id);
        const findUsername = await User.findByUsername(body.username);

        if (findId != null || findUsername != null) {
            return { sc: 400 };
        }

        const response = await User.signup(body);

        if (response) {
            return {
                sc: 200,
                response
            };
        }
    },

    inputInfo: async (body) => {

        const userinfo = await User.inputInfo(body);

        return {
            sc: 200,
            userinfo
        };
    },

    privacy : async (body) => {
        
    },

    check: async (id) => {
        const user = await User.findById(id);

        //입력값이 DB랑 동일하거나 입력값이 없는 경우
        if (user || id === undefined) {
            return { sc: 400 };
        }
        return { sc: 200 };
    },

    emailCheck: async (email) => {
        const mail = await User.findByEmail(email);

        if (mail || email === undefined) {
            return { sc: 400 };
        }
        return { sc: 200 };
    },

    usernameCheck: async (username) => {
        const name = await User.findByUsername(username);

        if (name || username === undefined) {
            return { sc: 400 };
        }
        return { sc: 200 };
    },

    //authorization에서 accessToken 여부 확인 후 저장된 refreshToken 확인, 존재하면 200, 없으면 400
    logout: async (id) => {

        const getRefreshToken = await redisClient.get(id);
        if (!getRefreshToken) {
            return {
                sc: 400,
                msg: "no Token"
            };
        }

        redisClient.del(id);

        return { sc: 200 };
    },

    secede: async (id) => {

        const user = await User.findById(id);

        if (!user) {
            return {
                sc: 400,
                msg: "unknown account"
            };
        }

        redisClient.del(id);

        await User.secede(user.id);

        return { sc: 200 };
    },

    userNutrient: async (body) => {

        const username = (await User.findById(body.id)).username;
        const userinfo = await User.userInfo(body.id);
        const nutrient = await Nutritional.userNutrient(body.id); // 섭취 영양제
        const countNutritional = Object.keys(nutrient).length; // 영양제 수
        const userAge = await User.getAge(body.id); // 사용자 나이
        const daily = await Nutritional.getDaily(userAge, userinfo.gender); // 해당 나이 성별에 맞는 하루 영양소 섭취 기준
        const dailyEating = await Nutritional.getDailyEating(userAge, userinfo.gender); // 권장, 상한 섭취량 제공

        let userDaily = {}; // 42개 중 필요한 값 저장
        let userEating = {} // 42개 영양소중 사용자가 먹는 영양소만 저장할 object

        //영양소:{섭취량(defalut:0),권장치.상한치,단위}
        for (let i = 0; i < daily.length; i++) {
            userDaily[daily[i].nutrient_name] = { eating : 0, commend : daily[i].commend, max : daily[i].max, unit: daily[i].unit };
        }

        for (let i = 0; i < Object.keys(nutrient).length; i++) {

            const eating = await Nutritional.eatingNutrient(nutrient[i].nid);
            const key = Object.keys(eating.nutrient_info);

            for (let j = 0; j < key.length; j++) { //포함된 영양소를 반복하면서 포함된 값을 더함
                userDaily[key[j]].eating += parseFloat(nutrientFunction.changeValue(eating.nutrient_info[key[j]], userDaily[key[j]].unit));
                userEating[key[j]] = userDaily[key[j]]; //사용자가 먹는 것만 추가
            }
        }

        const countNutrient = Object.keys(userEating).length; // 중복 제외 영양소 수
        const eatingName = Object.keys(userEating); // 사용자 섭취 중인 영양소

        const healthScore = 90; // 건강 점수
        const otherEating = 0; // 다른 사람 평균
        const recommendNutrient = { test : "recommend Test!"};
        const tmtl = 77;

        return {
            sc: 200,
            username,
            healthScore,
            nutrient,
            countNutritional,
            countNutrient,
            eatingName,
            userEating,
            dailyEating,
            otherEating, // 미완성
            recommendNutrient, // 미완성
            tmtl // 미완성
        };
    }

}

export default userService;