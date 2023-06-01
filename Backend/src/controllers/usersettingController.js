import usersettingService from "../services/usersettingService.js"

const usersettingController = {

    userdata : async (req, res) => {
        try {
            const response = await usersettingService.userdata(req.body.uid);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
    },

}

export default usersettingController;