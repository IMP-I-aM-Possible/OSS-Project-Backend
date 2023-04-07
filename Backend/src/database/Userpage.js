import { Nutritionals } from "./models/nutritional.js";
import { UserNutrient } from "./models/user_nutrient.js";

const Userpage = {

    // 유저 페이지 메인
    getUserMain : async (nid) => {
        const userMain = await Nutritionals.findOne({attributes : ['company', 'name', 'nutrient_info'], where : { nid : `${nid}`}, raw : true});
        return userMain;
    },

    deleteUserNutrient : async (uid,nid) => {
        const deleteUserNutrient = await UserNutrient.destroy({ where : {uid : `${uid}`, nid : `${nid}`}, raw : true});
        return deleteUserNutrient;
    }

}

export default Userpage;