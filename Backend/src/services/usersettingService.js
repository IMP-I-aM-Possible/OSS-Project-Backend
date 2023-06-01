import Usersetting from "../database/Usersetting.js";

const usersettingService = {

    //섭취 중인 영양제, 하루 섭취량, 닉네임, 키, 몸무게, 성별
    userdata: async (uid) => {
        const userinfo = await Usersetting.getUserInfo(uid);
        return {
            sc: 200,
            userinfo
        }
    },
    
}

export default usersettingService;