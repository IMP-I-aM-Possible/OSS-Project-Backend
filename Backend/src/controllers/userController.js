import userService from "../services/userService.js";
import healthSerivces from "../services/healthServices.js";
const userController = {

    login: async (req, res) => {
        try {
            const response = await userService.login(req.body);
            if (response.sc == "400") {
                return res.json(response);
            }
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    signup: async (req, res) => {
        try {
            const response = await userService.signup(req.body);
            res.json(response);
        } catch (err) {
            //res.json(err);
            res.status(400).json(err);
        }
    },

    check: async (req, res) => {
        try {
            const response = await userService.check(req.body.id);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    emailCheck: async (req, res) => {
        try {
            const response = await userService.emailCheck(req.body.email);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    usernameCheck: async (req, res) => {
        try {
            const response = await userService.usernameCheck(req.body.username);
            res.json(response);
        } catch (err) {
            res.json(err);
        }

    },

    inputInfo: async (req, res) => {
        try {
            const response = await userService.inputInfo(req.body);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    logout: async (req, res) => {
        try {
            const response = await userService.logout(req.body.id);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    secede: async (req, res) => {
        try {
            const response = await userService.secede(req.body.id);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    userNutrient: async (req, res) => {
        try {
            /* const nutrient = await userService.userNutrient(req.body); */
            const recommendNutrient = await healthSerivces.recommendNutrient(req.body)
            if (req.body.uid === undefined) {
                res.json({
                    sc: 400
                })
            }
            res.json(recommendNutrient);
        } catch (err) {
            res.json(err);
        }
    },

    userSetting: async (req,res) => {
        try{
            const response = await userService.userSetting(req.body.uid)
            res.json(response)
        }
        catch(err){
            res.json(err)
        }
    }

}

export default userController;