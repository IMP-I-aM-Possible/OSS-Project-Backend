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

    getIncludeSubInfo : async (offset) => {
        const includeSubInfo = await Nutritional.getIncludeSubInfo(offset);
        if (!includeSubInfo) return { sc : 400 };
            return {
                sc : 200,
                includeSubInfo
            };

    }
}

export default nutritionalService;