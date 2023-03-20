import User from "./User.js"

    export const login =  async (req,res) => {
        console.log(req.body);
        //console.log(`${req.body.id} & ${req.body.pw}`);
        //console.log(JSON.stringify(req.body, undefined, 2), [`id]);
        const user = new User(req.body);
        const response = await user.login();
        console.log(JSON.stringify(response));
        return res.json(response);
    };