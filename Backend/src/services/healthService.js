import Nutritional from "../database/Nutritional.js";
import User from "../database/User.js";
import nutrientFunction from "../functions/nutrientFunction.js";

const healthService = { //건강점수 계산 바꿔야함
    healthScore: async (uid) => { //해당 영양제 수정 전 
        const nutrientweight = {
            "리놀레산": 1,
            "알파리놀레산": 1,
            "EPA": 1,
            "DHA": 1,
            "메티오닌": 4,
            "류신": 4,
            "이소류신": 4,
            "발린": 4,
            "라이신": 4,
            "페닐알라닌": 4,
            "티로신": 1,
            "트레오닌": 4,
            "트립토판": 4,
            "히스티딘": 1,
            "비타민A": 4,
            "비타민D": 4,
            "비타민E": 4,
            "비타민K": 4,
            "비타민C": 4,
            "티아민": 0.5,
            "리보플라빈": 0.5,
            "니아신": 0.5,
            "피리독신": 0.5,
            "엽산": 0.5,
            "코발라민": 0.5,
            "판토텐산": 0.5,
            "비오틴": 0.5,
            "칼슘": 11,
            "인": 11,
            "나트륨": 11,
            "염소": 1,
            "칼륨": 11,
            "마그네슘": 1,
            "철": 1,
            "아연": 1,
            "구리": 1,
            "불소": 1,
            "망간": 1,
            "요오드": 1,
            "셀레늄": 1,
            "몰리브덴": 1,
            "크롬": 1
        }

        const userInfo = await User.userInfo(uid); //유저 신체정보
        const userNutritional = await Nutritional.userNutrient(uid); // 유저가 먹는 영양제 id, count
        const age = await User.getAge(uid);
        const dailyNutrient = await Nutritional.getDaily(age, userInfo.gender);
        for (let i = 0; i < dailyNutrient.length; i++) {
            dailyNutrient[i].eating = 0;
        }

        let health = 0;

        for (let i = 0; i < userNutritional.length; i++) {
            let eatNutritional = await Nutritional.findNutritional(userNutritional[i].nid); //유저가 먹는 영양제 상세내용 
            for (const key in eatNutritional[0].nutrient_info) {
                for (var j = 0; j < dailyNutrient.length; j++) {
                    if (key == dailyNutrient[j].nutrient_name) {
                        dailyNutrient[j].eating += parseInt(eatNutritional[0].nutrient_info[key]);
                    }
                }
            }
        }

        for (let j = 0; j < dailyNutrient.length; j++) {
            if (dailyNutrient[j].eating > 0) {
                let value = nutrientFunction.changeValue(parseFloat(dailyNutrient[j].eating), dailyNutrient[j].unit); //영양제 포함된 값 단위 변환 한 것 

                if (value <= dailyNutrient[j].commend) { //case 1 권장치 보다 낮을떄 
                    health += (((value * 100) / parseFloat(dailyNutrient[j].commend)) / 100) * nutrientweight[dailyNutrient[j].nutrient_name];
                }
                else { //case 2 권장치 보다 높을떄

                    if (dailyNutrient[j].max == "None") { //상한치 없을떄
                        health += nutrientweight[dailyNutrient[j].nutrient_name];
                    }
                    else { //상한치 있을떄 
                        if (value - parseFloat(dailyNutrient[j].commend) < parseFloat(dailyNutrient[j].max)) { //섭취량 - 권장량 >= 상한치 
                            health += (nutrientweight[dailyNutrient[j].nutrient_name] - ((((value - parseFloat(dailyNutrient[j].commend)) * 100) / parseFloat(dailyNutrient[j].max)) / 100));
                        }
                    }

                }
            }
        }
        await User.updateHealth(Math.round(health), uid);

        return Math.round(health);
    }
}

export default healthService;