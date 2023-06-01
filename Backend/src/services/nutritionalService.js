import Nutritional from "../database/Nutritional.js";

const nutritionalService = {

    getNutritional: async (offset) => {
        const nutritional = await Nutritional.getNutritional(offset);
        if (!nutritional) return { sc: 400 };
        return {
            sc: 200,
            nutritional
        };
    },

    getProduct: async (nid) => {
        const product = await Nutritional.getProduct(nid);
        const nutrientcommend = {};
        const review = await Nutritional.getReview(nid);
        if (!product) return { sc: 400 };
        const key = Object.keys(product.nutrient_info)
        for (let i = 0; i < key.length; i++) {
            let daily = await Nutritional.getDailyNutrient(24, 'M', key[i])
            nutrientcommend[key[i]] = { commend: daily.commend, unit: daily.unit }
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
            const len = await Nutritional.getNutritionalLength();
            if (!includeInfo) return { sc: 400 };
            return {
                sc: 200,
                includeInfo,
                len
            };
        } else {
            const includeInfo = await Nutritional.getIncludeInfo(info, offset);
            const len = await Nutritional.getIncludeInfoLength(info);

            if (!includeInfo) return { sc: 400 };
            return {
                sc: 200,
                includeInfo,
                len
            };
        }
    },

    getSubIncludeInfo : async (info, offset) => {
        const includeInfo = await Nutritional.getSubIncludeInfo(info);
        const len = await Nutritional.getSubIncludeInfoLength(info);
        if (!includeInfo) return { sc: 400 };
        return {
            sc: 200,
            includeInfo,
            len
        };
    },

    search: async (info, search, offset) => {
        const includeInfo = await Nutritional.search(search, offset);
        const len = await Nutritional.searchLength(search);

        if (!includeInfo) return { sc: 400 };
        return {
            sc: 200,
            includeInfo,
            len
        };
    },

    addReview: async (review) => {
        const addReview = await Nutritional.addReview(review);
        if (!addReview) return { sc: 400 };
        return { sc: 200 };
    }
}

export default nutritionalService;