import { Nutritionals } from "./models/nutritional.js";
import { DailyNutrient } from "./models/dailyNutrient.js";
import { UserNutrient } from "./models/user_nutrient.js";
import sequelize from "./models/index.js";
import { Sequelize, Op } from "sequelize";
import { Review } from "./models/review.js";
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
        const nutrient = await UserNutrient.findAll({ where : { uid : `${uid}`}, order : [['updated_at', 'DESC']], raw : true});
        return nutrient;
    },

    // 상품 전체
    getNutritional : async (offset) => {
        const nutritional = await Nutritionals.findAll({attributes : ['nid', 'company', 'name', 'iherb_price', 'naver_price', 'rating', 'rating_count'], order : [['rating_count', 'DESC']], offset : (offset - 1) * 48, limit : 48, raw : true });
        return nutritional;
    },

    // 상품 전체 개수
    getNutritionalLength : async () => {
        const product = await Nutritionals.findAll();
        const len = product.length;
        return len;
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

    // 영양소 포함 상품 개수
    getIncludeInfoLength : async (info) => {
        const product = await sequelize.query(`SELECT nid FROM OSS.nutritional WHERE JSON_EXTRACT(nutrient_info, '$."${info}"')`,{ type: Sequelize.QueryTypes.SELECT });
        const len = product.length;
        return len;
    },

    // 영양소 포함 상품
    getSubIncludeInfo : async (info) => {
        const includeInfo = await sequelize.query(`SELECT nid, company, name, iherb_price, naver_price, rating, rating_count FROM OSS.nutritional WHERE JSON_EXTRACT(sub_nutrient_info, '$."${info}"')`,{ type: Sequelize.QueryTypes.SELECT });
        return includeInfo;
    },

    getSubIncludeInfoLength : async (info) => {
        const product = await sequelize.query(`SELECT nid FROM OSS.nutritional WHERE JSON_EXTRACT(sub_nutrient_info, '$."${info}"')`,{ type: Sequelize.QueryTypes.SELECT });
        const len = product.length;
        return len;
    },

    //영양소 검색 (info = name)
    search : async (search, offset) => {
        const includeInfo = await Nutritionals.findAll({ where : {
            name : {[Op.substring] : `${search}`}
        }, offset : (offset - 1) * 48, limit : 48, raw : true });
        //console.log(includeSubInfo);

        return includeInfo;
    },

    //영양소 검색 개수 (info = name);
    searchLength : async (search) => {
        const product = await Nutritionals.findAll({ where : {
            name : {[Op.substring] : `${search}`}
        }, raw : true });
        const len = product.length;
        return len;
    },

    /* recommendNutritional : async () => { 삭제예정
        const recommendnutritional = await Nutritionals.findAll({attributes : ['nid', 'company', 'name', 'nutrient_info', 'sub_nutrient_info'], order : sequelize.random(), limit : 5 },{ where : { expired_at : null }});
        return recommendnutritional;
    }, */

    getReview : async (nid) => {
        const getreview = await Review.findAll({where : {nid : nid}, raw : true});
        return getreview;
    },

    addReview : async (review) => {
        const addreview = await Review.create(review);
        return addreview;
    },

    getDailyNutrient : async (age, gender, nutrient) => {
        const daily = await DailyNutrient.findOne({where : {age : age, gender : gender, nutrient_name : nutrient}, raw : true})
        return daily
    }, 

    recommendNutritional : async (nutrient) => {
        const recommendnutritional = await Nutritionals.findOne({where: sequelize.literal(`JSON_EXTRACT(nutrient_info, '$."${nutrient}"') <> 0 `), order: sequelize.random(), raw : true})
        //const recommendnutritional = await Nutritionals.findAll({order: sequelize.random(), limit : 5},{where : {expired_at : null}})
        return recommendnutritional;
    },

    getSymptomNutritional : async (n1,n2,n3,n4,n5,offset) => {
        const getsymptomnutritional = await Nutritionals.findAll({
            where: {
              [Op.or]: [
                { sub_nutrient_info: { [Op.like]: `%${n1}%` } },
                { sub_nutrient_info: { [Op.like]: `%${n2}%` } },
                { sub_nutrient_info: { [Op.like]: `%${n3}%` } },
                { sub_nutrient_info: { [Op.like]: `%${n4}%` } },
                { sub_nutrient_info: { [Op.like]: `%${n5}%` } }
              ],
            }, offset : (offset - 1) * 48, limit : 48, raw : true 
          })
        return getsymptomnutritional
    },

    getNutritionalName : async (nid) => {
        const name = await Nutritionals.findOne({ attributes : ['name'], where : {nid : `${nid}`}, raw : true });
        return name;
    }
    // test : async () => {
    //     const age = await sequelize.query(`SELECT (TO_DAYS(now())-TO_DAYS('100214')) / 365`, { type : sequelize.QueryTypes.SELECT });
    //     console.log(Math.floor(Object.values(age[0])));
    //     return age;
    // }
}

export default Nutritional;