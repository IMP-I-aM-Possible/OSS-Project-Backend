import { Nutritionals } from "./models/nutritional.js";
import { Users } from "./models/user.js";
import { UserInfo } from "./models/userinfo.js"
import { UserNutrient } from "./models/user_nutrient.js";

const User = {
    login : async (id) => {
        const user = await Users.findOne({ where: { id: `${id}` }, raw: true });
        return user;
    },

    signup : async (client) => {
        const user = await Users.create({
            id : `${client.id}`,
            email : `${client.email}`,
            pw : `${client.pw}`,
            username : `${client.username}`
        });

        return user;
    },

    inputInfo : async (client) => {
        const userinfo = await UserInfo.create({
            id : `${client.id}`,
            height : `${client.height}`,
            weight : `${client.weight}`,
            gender : `${client.gender}`,
            age : `${client.age}`
        });

        return userinfo;
    },

    userInfo : async (id) => {
        const user = await UserInfo.findOne({ where : { id : `${id}` }, raw : true });
        return user;
    },

    //login과 코드 같음...?
    findById : async (id) => {
        const user = await Users.findOne({ where: { id: `${id}` }, raw: true });
        return user;
    },

    findByUsername : async (username) => {
        const user = await Users.findOne({ where : { username : `${username}` }, raw : true});
        return user;
    },

    findByEmail : async (email) => {
        const mail = await Users.findOne({ where : {email : `${email}`}, raw : true});
        return mail;
    },

    secede : async (id) => {
        const user = await Users.destroy({ where : { id : `${id}`} });
        const userinfo = await UserInfo.destroy({ where : { id : `${id}`} });
        const userNutrient = await UserNutrient.destroy({where : {id : `${id}`}});
        return { user, userinfo, userNutrient };
    }
    
};

export default User;