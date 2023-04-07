import nutritionalService from "../services/nutritionalService.js";

const nutritionalController = {

    getNutritional: async (req, res) => {
        try {
            console.log(req.query);
            const nutritional = await nutritionalService.getNutritional(req.query.offset);
            return res.json(nutritional);
        } catch (err) {
            res.json(err);
        }

    },

    getProduct: async (req, res) => {
        try {
            console.log(req.params);
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

    getIncludeSubInfo: async (req, res) => {
        try {
            const includeSubInfo = await nutritionalService.getIncludeSubInfo(req.query.offset); // decodeURIComponent(req.query.info), 
            return res.json(includeSubInfo);
        } catch (err) {
            res.json(err);
        }
    }

}

export default nutritionalController;