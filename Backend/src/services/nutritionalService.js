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

    search : async (search, offset) => {
        const content = await Nutritional.search(search, offset);
        if (!content) return { sc : 400 };
            return {
                sc : 200,
                content
            };

    }
}

export default nutritionalService;