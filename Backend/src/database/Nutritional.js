import { Nutritionals } from "./models/nutritional.js";
import { DailyNutrient } from "./models/dailyNutrient.js";
import { UserNutrient } from "./models/user_nutrient.js";
import sequelize from "./models/index.js";
import { Sequelize, Op } from "sequelize";

const Nutritional = { 
    getDaily : async (age, gender) => {
        const daily = await DailyNutrient.findAll({ where : { age : age, gender : gender }, raw : true});
        return daily;
    },

    // 해당 나이 일일 섭취량
    getDailyEating : async (age, gender) => {
        const dailyEating = await DailyNutrient.findAll({ attributes : ['nutrient_name', 'commend', 'max', 'unit'], where : { age : age, gender : gender }, raw : true });
        return dailyEating;
    },

    // 사용자 섭취 영양제
    userNutrient : async (uid) => {
        const nutrient = await UserNutrient.findAll({ where : { uid : `${uid}`}, order : [['nid', 'ASC']], raw : true});
        return nutrient;
    },

    // 상품 전체
    getNutritional : async (offset) => {
        const nutritional = await Nutritionals.findAll({attributes : ['nid', 'company', 'name', 'iherb_price', 'naver_price', 'rating', 'rating_count'], offset : (offset - 1) * 48, limit : 48, raw : true });
        return nutritional;
    },

    findNutritional: async (nid) => {
        const find = await Nutritionals.findAll({ where : { nid: `${nid}` }, raw : true });
        return find;
    },

    eatingNutrient : async (nid) => {
        const eatingNutrient = await Nutritionals.findOne({attributes : ['nutrient_info'], where : { nid : `${nid}` }, raw : true});
        return eatingNutrient;
    },

    // 상품 하나
    getProduct : async (nid) => {
        const product = await Nutritionals.findOne({ where : { nid : `${nid}` }, raw : true });
        return product;
    },

    // 영양소 포함 상품
    getIncludeInfo : async (info, offset) => {
        const includeInfo = await sequelize.query(`SELECT nid, company, name, iherb_price, naver_price, rating, rating_count FROM OSS.nutritional WHERE JSON_EXTRACT(nutrient_info, '$."${info}"') LIMIT 48 OFFSET ${(offset - 1) * 48}`,{ type: Sequelize.QueryTypes.SELECT });
        return includeInfo;
    },

    getIncludeSubInfo : async (offset) => {
        const includeSubInfo = await Nutritionals.findAll({ where : {
            sub_nutrient_info : {[Op.substring] : '단백'}
        }, offset : (offset - 1) * 48, limit : 48, raw : true });
        //console.log(includeSubInfo);

        return includeSubInfo;
    },

    recommendNutritional : async () => {
        const recommendnutritional = await Nutritionals.findAll({attributes : ['nid', 'company', 'name', 'nutrient_info', 'sub_nutrient_info'], order : sequelize.random(), limit : 5 },{ where : { expired_at : null }});
        return recommendnutritional;
    }
    // test : async () => {
    //     const age = await sequelize.query(`SELECT (TO_DAYS(now())-TO_DAYS('100214')) / 365`, { type : sequelize.QueryTypes.SELECT });
    //     console.log(Math.floor(Object.values(age[0])));
    //     return age;
    // }
}

export default Nutritional;