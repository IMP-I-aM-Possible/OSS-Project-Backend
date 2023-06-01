import nutritionalService from "../services/nutritionalService.js";
import searchService from "../services/searchService.js";

const nutritionalController = {

    getNutritional: async (req, res) => {
        try {
            const nutritional = await nutritionalService.getNutritional(req.query.offset);
            return res.json(nutritional);
        } catch (err) {
            res.json(err);
        }

    },

    getProduct: async (req, res) => {
        try {
            const product = await nutritionalService.getProduct(req.params.nid);
            return res.json(product);
        } catch (err) {
            res.json(err);
        }
    },

    getIncludeInfo: async (req, res) => {
        try {
            const includeInfo = await nutritionalService.getIncludeInfo(decodeURIComponent(req.query.info), req.query.offset);
            return res.json(includeInfo);
        } catch (err) {
            res.json(err);
        }
    },

    search : async (req, res) => {
        try {
            if(req.query.info == "name") {
                const includeInfo = await nutritionalService.search(req.query.info, req.query.search, req.query.offset); // decodeURIComponent(req.query.info), 
                return res.json(includeInfo);
            } else if (req.query.info == "symptom") {
                const includeInfo = await searchService.getData(req.query.search, req.query.offset);
                /* let data = {};
                for(let i = 0; i < includeInfo.length; i++) {
                    data += await nutritionalService.getSubIncludeInfo(includeInfo[i]);
                }

                console.log(data); */
                return res.json(includeInfo);
            }
            
        } catch (err) {
            res.json(err);
        }
    },

    addReview: async (req, res) => {
        try{
            const addReview = await nutritionalService.addReview(req.body)
            return res.json(addReview)
        } catch (err) {
            res.json(err)
        }
    }

}

export default nutritionalController;