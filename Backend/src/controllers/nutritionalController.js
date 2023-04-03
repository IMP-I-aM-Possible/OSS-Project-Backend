import nutritionalService from "../services/nutritionalService.js";
import health from "../services/healthServices.js"
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
            const product = await nutritionalService.getProduct(req.params.nutritional_id);
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
    
    addUserNutrient: async (req, res) => {
        try{
            const adduserNutrient = await nutritionalService.addUserNutrient(req.body.id, req.body.nutritional_id, req.body.count);
            const response = await health.HealthScore(req.body.id)
            return res.json("성공")
        } catch (err) {
            res.json(err)
        }
    }

}

export default nutritionalController;