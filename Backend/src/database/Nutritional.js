import { Nutritionals } from "./models/nutritional.js";
import { DailyNutrient } from "./models/dailyNutrient.js";
import { UserNutrient } from "./models/user_nutrient.js";
import {Review} from "./models/review.js"
import sequelize from "./models/index.js";
import { Sequelize } from "sequelize";

const Nutritional = { 
    getDaily : async (age, gender) => {
        const daily = await DailyNutrient.findAll({ where : { age : age, gender : gender }, raw : true});
        return daily;
    },

    getDailyNutrient : async (age, gender, nutrient) => {
        const daily = await DailyNutrient.findOne({ where : { age : age, gender : gender, nutrient_name : nutrient }, raw : true});
        return daily;
    },

    // 해당 나이 일일 섭취량
    getDailyEating : async (age, gender) => {
        const dailyEating = await DailyNutrient.findAll({ attributes : ['nutrient_name', 'commend', 'max', 'unit'], where : { age : age, gender : gender }, raw : true });
        return dailyEating;
    },

    // 사용자 섭취 영양제
    userNutrient : async (id) => {
        const nutrient = await UserNutrient.findAll({ where : { UID : `${id}`}, order : [['NID', 'ASC']], raw : true});
        return nutrient;
    },

    // 상품 전체
    getNutritional : async (offset) => {
        const nutritional = Nutritionals.findAll({attributes : ['id', 'company', 'name', 'iherb_price', 'naver_price', 'rating', 'rating_count'], offset : (offset - 1) * 48, limit : 48, raw : true });
        return nutritional;
    },

    findNutritional: async (id) => {
        const find = await Nutritionals.findAll({ where : { id: id }, raw : true });
        return find;
    },

    eatingNutrient : async (nutrient_name) => {
        const eatingNutrient = await Nutritionals.findOne({attributes : ['nutrient_info'], where : { id : `${nutrient_name}` }, raw : true});
        return eatingNutrient;
    },

    // 상품 하나
    getProduct : async (nutritional_id) => {
        const product = Nutritionals.findOne({ where : { id : nutritional_id }, raw : true });
        return product;
    },

    // 영양소 포함 상품
    getIncludeInfo : async (info, offset) => {
        const includeInfo = await sequelize.query(`SELECT id, company, name, iherb_price, naver_price, rating, rating_count FROM OSS.nutritional WHERE JSON_EXTRACT(nutrient_info, '$."${info}"') LIMIT 48 OFFSET ${(offset - 1) * 48}`,{ type: Sequelize.QueryTypes.SELECT });
        return includeInfo;
    },

    //사용자 섭취중인 영양제 추가
    addUserNutrient : async (uid,nid) => {
        const adduserNutrient = await UserNutrient.create({uid : `${uid}`, nid : `${nid}`, count : 1})
        return adduserNutrient
    },

    deleteUserNutrient : async (uid,nid) => {
        const deleteuserNutrient = await UserNutrient.destroy({ where : {uid : `${uid}`, nid : `${nid}`}})
        return deleteuserNutrient
    },

    recommendNutritional : async (nutrient) => {
        const recommendnutritional = await Nutritionals.findOne({where: sequelize.literal(`JSON_EXTRACT(nutrient_info, '$."${nutrient}"') <> 0 `), order: sequelize.random()})
        //const recommendnutritional = await Nutritionals.findAll({order: sequelize.random(), limit : 5},{where : {expired_at : null}})
        return recommendnutritional
    },

    getReview : async (nid) => {
        const getreview = await Review.findAll({where : {nid : nid}, raw : true})
        return getreview
    },

    addReview : async (review) => {
        console.log(review)
        const addreview = await Review.create(review)
        return addreview
    },

    randomNutritional : async () => {
        const randomnutritional = await Nutritionals.findOne({order : sequelize.random()})
        return randomnutritional
    }

    // test : async () => {
    //     const age = await sequelize.query(`SELECT (TO_DAYS(now())-TO_DAYS('100214')) / 365`, { type : sequelize.QueryTypes.SELECT });
    //     console.log(Math.floor(Object.values(age[0])));
    //     return age;
    // }
}

export default Nutritional;