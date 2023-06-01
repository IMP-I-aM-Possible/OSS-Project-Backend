import { Users } from "./models/user.js";
const Usersettingpage = {

    // 유저 페이지 메인
    getUserInfo : async (uid) => {
        const userMain = await Users.findOne( { where : { uid : `${uid}`}, raw : true});
        return userMain;
    }

}

export default Usersettingpage;