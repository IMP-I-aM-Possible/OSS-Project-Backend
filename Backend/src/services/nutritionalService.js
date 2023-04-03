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

    getProduct: async (nutritional_id) => {
        const product = await Nutritional.getProduct(nutritional_id);
        if (!product) return { sc : 400 };
        return {
            sc: 200,
            product
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

    addUserNutrient: async (uid,nid,count) => { // 사용자 섭취중인 영양제 추가
        const adduserNutrient = await Nutritional.addUserNutrient(uid,nid,count);
        return 1
    }
}

export default nutritionalService;