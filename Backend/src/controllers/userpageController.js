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
            //console.log(req.body.selected.length);

            for(let i = 0; i < req.body.selected.length; i++) {
                await userpageService.deleteUserNutrient(req.body.uid, req.body.selected[i]);
            }
            const response = await health.healthScore(req.body.uid);
            return res.json(response);
        } catch (err) {
            res.json(err);
        }
    }
}

export default userpageController;