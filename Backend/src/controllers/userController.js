import userService from "../services/userService.js";

const userController = {

    login: async (req, res) => {
        try {
            const response = await userService.login(req.body);
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

            res.status(400).json(err);
        }
    },

    check: async (req, res) => {
        try {
            const response = await userService.check(req.body.uid);
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
            const response = await userService.logout(req.body.uid);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    secede: async (req, res) => {
        try {
            const response = await userService.secede(req.body.uid);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

    userNutrient: async (req, res) => {
        try {
            const nutrient = await userService.userNutrient(req.body);
            if (req.body.uid === undefined) {
                res.json({
                    sc: 400
                })
            }
            res.json(nutrient);
        } catch (err) {
            res.json(err);
        }
    },

    addUserNutrient: async (req, res) => {
        try{
            const adduserNutrient = await userService.addUserNutritional(req.body.uid, req.body.nid);
            return res.json(adduserNutrient)
        } catch (err) {
            res.json(err)
        }
    },

}

export default userController;