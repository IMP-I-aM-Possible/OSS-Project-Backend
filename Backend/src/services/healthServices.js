import Nutritional from "../database/Nutritional.js";
import User from '../database/User.js';
import nutrientFunction from '../functions/nutrientFunction.js';
const healthSerivces = { //건강점수 계산 바꿔야함
    HealthScore: async (id) => { //해당 영양제 수정 전 
        const nutrientweight = {"리놀레산":1,"알파리놀레산":1,"EPA":1,"DHA":1,"메티오닌":4,"류신":4,"이소류신":4,"발린":4,"라이신":4,"페닐알라닌":4,"티로신":1,"트레오닌":4,"트립토판":4,"히스티딘":1,"비타민A":4,"비타민D":4,"비타민E":4,"비타민K":4,"비타민C":4,"티아민":0.5,"리보플라빈":0.5,"니아신":0.5,"피리독신":0.5,"엽산":0.5,"코발라민":0.5,"판토텐산":0.5,"비오틴":0.5,"칼슘":11,"인":11,"나트륨":11,"염소":1,"칼륨":11,"마그네슘":1,"철":1,"아연":1,"구리":1,"불소":1,"망간":1,"요오드":1,"셀레늄":1,"몰리브덴":1,"크롬":1}
        
        const userinfo = await User.userInfo(id) //유저 신체정보
        const nutrient = await Nutritional.userNutrient(id) // 유저가 먹는 영양제 id, count
        const dailynutrient = await Nutritional.getDaily(userinfo.birth,userinfo.gender)
        for (var i = 0; i < dailynutrient.length; i++){
            dailynutrient[i].eating = 0
        }
        let health = 0
        
        for (var i = 0; i < nutrient.length ; i ++){
            let eatnutritional = await Nutritional.findNutritional(nutrient[i].nid) //유저가 먹는 영양제 상세내용 
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
                        health += nutrientweight[dailynutrient[j].nutrient_name]
                    }
                    else{ //상한치 있을떄 
                        if (value < parseFloat(dailynutrient[j].max)){ //상한치만 넘지 않으면 점수를 깍지 않음 
                            health += nutrientweight[dailynutrient[j].nutrient_name]
                        }
                        //권장치에서 조금만 벗어나도 조금씩 깍음 
                        /* if (value-parseFloat(dailynutrient[j].commend) < parseFloat(dailynutrient[j].max)){ //섭취량 - 권장량 >= 상한치 
                            health += (nutrientweight[dailynutrient[j].nutrient_name] - ((((value-parseFloat(dailynutrient[j].commend))*100)/parseFloat(dailynutrient[j].max))/100))
                        } */
                    }
                    
                }
            }   
        }
        await User.UpdateHealth(Math.round(health),id)
        return Math.round(health)
    },
    //영양소 및 영양제 추천
    recommendNutrient : async (body) => {
        let recommendnutrient = []
        const recommendnutritional = []
        let nutrientname = ["리놀레산","알파리놀레산","EPA","DHA","메티오닌",
        "류신","이소류신","발린","라이신","페닐알라닌",
        "티로신","트레오닌","트립토판","히스티딘","비타민A",
        "비타민D","비타민E","비타민K","비타민C","티아민",
        "리보플라빈","니아신","피리독신","엽산","코발라민",
        "판토텐산","비오틴","칼슘","인","나트륨",
        "염소","칼륨","마그네슘","철","아연",
        "구리","불소","망간","요오드","셀레늄",
        
        "몰리브덴","크롬"]
        const nutrient = await Nutritional.userNutrient(body.uid)
        for (let i = 0 ; i< nutrient.length ; i++){
            let eatnutritional = await Nutritional.findNutritional(nutrient[i].nid) 
            let key = Object.keys(eatnutritional[0].nutrient_info)
            nutrientname = nutrientname.filter((item)=> {return !key.includes(item)})
        }

        if (nutrientname.length >= 5) {
            while(recommendnutrient.length < 5){
                let randomIndex = Math.floor(Math.random() * nutrientname.length)
                if (!recommendnutrient.includes(nutrientname[randomIndex])){
                    recommendnutrient.push(nutrientname[randomIndex])
                }
            }
        }
        else{
            for (let i = 0; i < nutrientname.length ; i++){
                recommendnutrient.push(nutrientname[i])
            }
        }
        
        for (let i = 0; i< recommendnutrient.length ; i++){

            let recommendlist = await Nutritional.recommendNutritional(recommendnutrient[i])
            recommendnutritional.push(recommendlist)
        }
        
        
        return {recommendnutrient,recommendnutritional}
    }
}

export default healthSerivces