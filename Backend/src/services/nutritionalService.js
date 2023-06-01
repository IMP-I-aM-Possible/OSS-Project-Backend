import Nutritional from "../database/Nutritional.js";

const nutritionalService = {

    getNutritional: async (offset) => {
        const nutritional = await Nutritional.getNutritional(offset);
        if (!nutritional) return { sc : 400 };
        return {
            sc: 200,
            nutritional
        };
    },

    getProduct: async (nid) => {
        const product = await Nutritional.getProduct(nid);
        const nutrientcommend = {};
        const review = await Nutritional.getReview(nid);
        if (!product) return { sc : 400 };
        const key = Object.keys(product.nutrient_info)
        for (let i = 0 ; i < key.length; i++){
            let daily = await Nutritional.getDailyNutrient(24,"M",key[i])
            nutrientcommend[key[i]] = {commend : daily.commend, unit : daily.unit}
        }
        return {
            sc: 200,
            product,
            nutrientcommend,
            review
        };
    },

    getIncludeInfo: async (info, offset) => {
        if (info === 'all') {
            const includeInfo = await Nutritional.getNutritional(offset);
            if (!includeInfo) return { sc : 400 };
            return {
                sc: 200,
                includeInfo
            };
        } else {
            const includeInfo = await Nutritional.getIncludeInfo(info, offset);
            if (!includeInfo) return { sc : 400 };
            return {
                sc : 200,
                includeInfo
            };
        }
    }, 

    addUserNutrient: async (uid,nid) => { // 사용자 섭취중인 영양제 추가
        console.log(uid,nid)
        const adduserNutrient = await Nutritional.addUserNutrient(uid,nid);
        if (!adduserNutrient) return {sc:400}
        return {sc:200}
    },

    deleteUserNutrient: async (uid,nid) => { // 사용자 섭취중인 영양제 추가
        const deleteuserNutrient = await Nutritional.deleteUserNutrient(uid,nid);
        if (!deleteuserNutrient) return {sc:400}
        return {sc:200}
    },

    addReview: async (review) => {
        const addReview = await Nutritional.addReview(review);
        if (!addReview) return {sc:400}
        return {sc:200}
    }

}

export default nutritionalService;