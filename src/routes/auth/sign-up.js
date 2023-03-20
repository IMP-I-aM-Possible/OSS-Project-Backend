import User from "./User.js"

    export const signUp = async (req,res) => {
        const user = new User(req.body);
        const response = await user.signUp();
        return res.json(response);
    };