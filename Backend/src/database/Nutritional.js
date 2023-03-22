import { Nutritionals } from "./models/nutritional.js";
import { DailyNutrient } from "./models/dailyNutrient.js";
import { UserNutrient } from "./models/user_nutrient.js";
import sequelize from "./models/index.js";

const Nutritional = { 
    getDaily : async (age, gender) => {
        const daily = await DailyNutrient.findAll({ where : { age : age, gender : gender }, raw : true});
        return daily;
    },

    getDailyEating : async (age, gender) => {
        const dailyEating = await DailyNutrient.findAll({ attributes : ['nutrient_name', 'commend', 'max', 'unit'], where : { age : age, gender : gender }, raw : true });
        return dailyEating;
    },

    userNutrient : async (id) => {
        const nutrient = await UserNutrient.findAll({ where : { id : `${id}`}, order : [['nutrient_name', 'ASC']], raw : true});
        return nutrient;
    },

    // 상품 전체
    getNutritional : async (offset) => {
        const nutritional = Nutritionals.findAll({attributes : ['id', 'company', 'name', 'price', 'stars', 'purchase'], offset : (offset - 1) * 48, limit : 48, raw : true });
        return nutritional;
    },

    findNutritional: async (id) => {
        const find = await Nutritionals.findAll({ where : { id: id }, raw : true });
        return find;
    },

    eatingNutrient : async (nutrient_name) => {
        const eatingNutrient = await Nutritionals.findOne({attributes : ['info'], where : { id : `${nutrient_name}` }, raw : true});
        return eatingNutrient;
    },

    // 상품 하나
    getProduct : async (nutritional_id) => {
        const product = Nutritionals.findOne({ where : { id : nutritional_id }, raw : true });
        return product;
    },

    // 영양소 포함 상품
    getIncludeInfo : async (info, offset) => {
        const includeInfo = await sequelize.query(`SELECT id, company, name, price, stars, purchase FROM OSS.nutritional WHERE JSON_EXTRACT(info, '$."${info}"') LIMIT 48 OFFSET ${(offset - 1) * 48}`,{ type: sequelize.QueryTypes.SELECT });
        return includeInfo;
    }
}

export default Nutritional;