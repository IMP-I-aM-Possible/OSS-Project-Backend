import Nutritional from "../database/Nutritional.js";
import User from '../database/User.js';
import nutrientFunction from '../functions/nutrientFunction.js';
const healthSerivces = { //건강점수 계산 바꿔야함
    HealthScore: async (id) => { //해당 영양제 수정 전 
        const nutrientweight = {"리놀레산":1,"알파리놀레산":1,"EPA":1,"DHA":1,"메티오닌":4,"류신":4,"이소류신":4,"발린":4,"라이신":4,"페닐알라닌":4,"티로신":1,"트레오닌":4,"트립토판":4,"히스티딘":1,"비타민A":4,"비타민D":4,"비타민E":4,"비타민K":4,"비타민C":4,"티아민":0.5,"리보플라빈":0.5,"니아신":0.5,"피리독신":0.5,"엽산":0.5,"코발라민":0.5,"판토텐산":0.5,"비오틴":0.5,"칼슘":11,"인":11,"나트륨":11,"염소":1,"칼륨":11,"마그네슘":1,"철":1,"아연":1,"구리":1,"불소":1,"망간":1,"요오드":1,"셀레늄":1,"몰리브덴":1,"크롬":1}
        
        const userinfo = await User.userInfo(id) //유저 신체정보
        const usernutritional = await Nutritional.userNutrient(id) // 유저가 먹는 영양제 id, count
        const dailynutrient = await Nutritional.getDaily(userinfo.birth,userinfo.gender)
        for (var i = 0; i < dailynutrient.length; i++){
            dailynutrient[i].eating = 0
        }
        let health = 0
        
        for (var i = 0; i < usernutritional.length ; i ++){
            let eatnutritional = await Nutritional.findNutritional(usernutritional[i].nid) //유저가 먹는 영양제 상세내용 
            for(const key in eatnutritional[0].nutrient_info){
                for(var j = 0; j < dailynutrient.length; j++){
                    if (key == dailynutrient[j].nutrient_name){
                        dailynutrient[j].eating += parseInt(eatnutritional[0].nutrient_info[key])
                    }
                }
            }
        }
        for(var j = 0; j < dailynutrient.length; j++){
            if(dailynutrient[j].eating > 0) {
                let value = nutrientFunction.changeValue(parseFloat(dailynutrient[j].eating),dailynutrient[j].unit) //영양제 포함된 값 단위 변환 한 것 
                
                if (value <= dailynutrient[j].commend ){ //case 1 권장치 보다 낮을떄 
                    health += (((value*100)/parseFloat(dailynutrient[j].commend))/100) * nutrientweight[dailynutrient[j].nutrient_name]
                }
                else{ //case 2 권장치 보다 높을떄
                    
                    if (dailynutrient[j].max == "None"){ //상한치 없을떄
                        //console.log(nutrientweight[key])
                        health += nutrientweight[dailynutrient[j].nutrient_name]
                    }
                    else{ //상한치 있을떄 
                        ////console.log(((((value-parseFloat(dailynutrient[j].commend))*100)/dailynutrient[j].max)/100))
                        if (value-parseFloat(dailynutrient[j].commend) < parseFloat(dailynutrient[j].max)){
                            health += (nutrientweight[dailynutrient[j].nutrient_name] - ((((value-parseFloat(dailynutrient[j].commend))*100)/parseFloat(dailynutrient[j].max))/100))
                        }
                    }
                    
                }
            }   
        }
        await User.UpdateHealth(Math.round(health),id)
        return Math.round(health)
    }
}

export default healthSerivces