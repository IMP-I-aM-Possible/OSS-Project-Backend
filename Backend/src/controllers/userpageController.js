import userpageService from "../services/userpageService.js";
import health from "../services/healthService.js";

const userpageController = {

    userdata : async (req, res) => {
        try {
            const response = await userpageService.userdata(req.body);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    deleteUserNutrient: async (req, res) => {
        try{
            await userpageService.deleteUserNutrient(req.body.uid, req.body.selected);
            const response = await health.healthScore(req.body.uid);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    }
}

export default userpageController;