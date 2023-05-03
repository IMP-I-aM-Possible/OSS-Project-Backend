import Nutritional from "../database/Nutritional.js";
import User from "../database/User.js";
import Userpage from "../database/Userpage.js";

const userpageService = {
    //test
    //섭취 중인 영양제, 하루 섭취량, 닉네임, 키, 몸무게, 성별
    userdata: async (body) => {

        const user = await User.userInfo(body.uid);
        const nutrient = await Nutritional.userNutrient(body.uid);

        for (let i = 0; i < nutrient.length; i++) {
            const userMain = await Userpage.getUserMain(nutrient[i].nid);
            nutrient[i].company = userMain.company;
            nutrient[i].name = userMain.name;
            nutrient[i].nutrient_info = userMain.nutrient_info;
        }

        return {
            sc: 200,
            user,
            nutrient
        }
    },
    
    deleteUserNutrient: async (uid, nid) => {
        const deleteUserNutrient = await Userpage.deleteUserNutrient(uid, nid);
        if (!deleteUserNutrient) return { sc : 400 };
        return { 
            sc : 200
         };
    }

}

export default userpageService;