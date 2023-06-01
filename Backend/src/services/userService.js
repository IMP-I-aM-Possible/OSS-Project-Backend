import User from '../database/User.js';
import Nutritional from '../database/Nutritional.js';
import nutrientFunction from '../functions/nutrientFunction.js';
import jwt_utils from '../utils/jwt.js';
import redisClient from '../utils/redis.js';
import bcrypt from "bcrypt";
import health from './healthService.js';


const userService = {

    login: async (body) => {

        const response = await User.login(body.uid);

        if (response.expired_at != null) {
            return {
                sc: 200,
                msg: "회원탈퇴 계정"
            }
        }

        if (response) {
            if (await bcrypt.compare(body.pw, response.pw)) {

                const accessToken = jwt_utils.accessToken(response);
                const refreshToken = jwt_utils.refreshToken();
                redisClient.SETEX(response.uid, 3600, refreshToken);

                const { uid, username } = response;

                return {
                    sc: 200,
                    uid,
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
        //id, username 중복 값 처리
        const findId = await User.findById(body.uid);
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

    check: async (uid) => {
        const user = await User.findById(uid);

        //입력값이 DB랑 동일하거나 입력값이 없는 경우
        if (user || uid === undefined) {
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
    logout: async (uid) => {

        const getRefreshToken = await redisClient.get(uid);
        if (!getRefreshToken) {
            return {
                sc: 400,
                msg: "no Token"
            };
        }

        redisClient.del(uid);

        return { sc: 200 };
    },

    secede: async (uid) => {

        const user = await User.findById(uid);

        if (!user) {
            return {
                sc: 400,
                msg: "unknown account"
            };
        }

        redisClient.del(uid);

        await User.secede(user.uid);

        return { sc: 200 };
    },

    userNutrient: async (body) => {
        
        const user = await User.findById(body.uid); // 사용자 찾기

        const username = user.username; //사용자명
        const email = user.email; // 사용자 이메일
        const nutrient = await Nutritional.userNutrient(body.uid); // 섭취 영양제

        const countNutritional = Object.keys(nutrient).length; // 영양제 수

        const userAge = await User.getAge(body.uid); // 사용자 나이

        const daily = await Nutritional.getDaily(userAge, user.gender); // 해당 나이 성별에 맞는 하루 영양소 섭취 기준
        const dailyEating = await Nutritional.getDailyEating(userAge, user.gender); // 권장, 상한 섭취량 제공

        let userDaily = {}; // 42개 중 필요한 값 저장
        let userEating = {} // 42개 영양소중 사용자가 먹는 영양소만 저장할 object
        let tmtlData = {}; // 사용자 상한 섭취량 넘는 영양소

        //영양소:{섭취량(defalut:0),권장치.상한치,단위}
        for (let i = 0; i < daily.length; i++) {
            userDaily[daily[i].nutrient_name] = { eating: 0, commend: daily[i].commend, max: daily[i].max, unit: daily[i].unit };
        }
        
        for (let i = 0; i < Object.keys(nutrient).length; i++) {

            const eating = await Nutritional.eatingNutrient(nutrient[i].nid);
            const key = Object.keys(eating.nutrient_info);

            for (let j = 0; j < key.length; j++) { //포함된 영양소를 반복하면서 포함된 값을 더함
                userDaily[key[j]].eating += parseFloat(nutrientFunction.changeValue(eating.nutrient_info[key[j]], userDaily[key[j]].unit));
                userDaily[key[j]].eating = Number(parseFloat(userDaily[key[j]].eating).toFixed(1))
                userEating[key[j]] = userDaily[key[j]]; //사용자가 먹는 것만 추가
                
            if(userEating[key[j]].max != null && userEating[key[j]].eating > userEating[key[j]].max) {
                tmtlData[key[j]] = userEating[key[j]];
            }
            }
        }
        
        const countNutrient = Object.keys(userEating).length; // 중복 제외 영양소 수
        const eatingName = Object.keys(userEating); // 사용자 섭취 중인 영양소

        let tmtl = 0; // 과하거나 부족 영양소 섭취량

        for (let i = 0; i < Object.keys(userEating).length; i++) {
            if (userEating[eatingName[i]].max != null && userEating[eatingName[i]].max - userEating[eatingName[i]].eating < 0) {
                // tmtl[eatingName[i]] = userEating[eatingName[i]].commend - userEating[eatingName[i]].eating;
                tmtl += 1;
            }
        }

        const healthScore = await health.healthScore(body.uid); // 건강 점수
        const otherEating = 20;  //다른 사람 평균 섭취량
        //const recommendNutritional = await Nutritional.recommendNutritional(); // 추천 영양제

        let recommendNutrient = []; // 추천 영양소
        const recommendNutritional = []; //추천 영양제
        let nutrientName = [
            "리놀레산", "알파리놀레산", "EPA", "DHA", "메티오닌",
            "류신", "이소류신", "발린", "라이신", "페닐알라닌",
            "티로신", "트레오닌", "트립토판", "히스티딘", "비타민A",
            "비타민D", "비타민E", "비타민K", "비타민C", "티아민",
            "리보플라빈", "니아신", "피리독신", "엽산", "코발라민",
            "판토텐산", "비오틴", "칼슘", "인", "나트륨",
            "칼륨", "마그네슘", "철", "아연",
            "구리", "망간", "요오드", "셀레늄",
            "몰리브덴", "크롬"
        ];

        for (let i = 0; i < nutrient.length; i++) {
            let eatNutritional = await Nutritional.findNutritional(nutrient[i].nid);
            let key = Object.keys(eatNutritional[0].nutrient_info);
            nutrientName = nutrientName.filter((item) => { return !key.includes(item) });
        }

        if (nutrientName.length >= 5) {
            while (recommendNutrient.length < 5) {
                let randomIndex = Math.floor(Math.random() * nutrientName.length);
                if (!recommendNutrient.includes(nutrientName[randomIndex])) {
                    recommendNutrient.push(nutrientName[randomIndex]);
                }
            }
        }
        else {
            for (let i = 0; i < nutrientName.length; i++) {
                recommendNutrient.push(nutrientName[i]);
            }

        }

        let i = 0;

        while(recommendNutritional.length < recommendNutrient.length){
            let recommendlist = await Nutritional.recommendNutritional(recommendNutrient[i]);
            if (!recommendNutritional.some(element => element.nid == recommendlist.uid)){
                recommendNutritional.push(recommendlist);
                i++
            }
            
        }

        const nutitionalLength = await Nutritional.getNutritionalLength(); // 영양소 전체 개수
        const people = await User.people(); // 사용자 수
        let log = await User.userNutrientLog(body.uid); // 메인 로그 표시용

        for(let i = 0; i < log.length; i++) {
            const name = await Nutritional.getNutritionalName(log[i].nid);
            log[i].name = Object.values(name)[0];
        };

        return {
            sc: 200,
            username,
            email,
            healthScore,
            nutrient,
            countNutritional,
            countNutrient,
            eatingName,
            userEating,
            dailyEating,
            otherEating,
            recommendNutrient,
            recommendNutritional,
            tmtl,
            nutitionalLength,
            people,
            tmtlData,
            log
        };
    },

    addUserNutritional: async (uid, nid) => {
        const addusernutritional = await User.addUserNutritional(uid, nid);
        if (!addusernutritional) return { sc: 400 };
        return { sc: 200 };
    }

}

export default userService;