import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Users } from "./models/user.js";
import { UserNutrient } from "./models/user_nutrient.js";
import Nutritional from "./Nutritional.js";

const User = {
    login : async (uid) => {
        const user = await Users.findOne({ where: { uid: `${uid}` }, raw: true });
        return user;
    },

    signup : async (client) => {

        const user = await Users.create(client);
            // id : `${client.id}`,
            // email : `${client.email}`,
            // pw : `${client.pw}`,
            // username : `${client.username}`,
            // height : `${client.height}`,
            // weight : `${client.weight}`,
            // birth : `${client.birth}`,
            // gender : `${client.gender}`,
            // health : `${client.health}

        return user;
    },

    // 회원 정보 입력 (삭제 예정)
    // inputInfo : async (client) => {
    //     const userinfo = await Users.create({
    //         id : `${client.id}`,
    //         email : `${client.email}`,
    //         pw : `${client.pw}`,
    //         username : `${client.username}`,
    //         height : `${client.height}`,
    //         weight : `${client.weight}`,
    //         birth : `${client.birth}`,
    //         gender : `${client.gender}`
    //     });

    //     return userinfo;
    // },

    // 사용자 나이 추출 (현재 - 생년월일)
    getAge : async (uid) => {
        const user = await Users.findOne({ where : { uid : `${uid}`}, raw : true });
        const query = `SELECT FLOOR(DATEDIFF(NOW(), '${user.birth}') / 365);`;
        const getAge = await sequelize.query(query, { type : Sequelize.QueryTypes.SELECT });
        const age = Object.values(getAge[0])[0];
        return age;
    },

    //사용자 수
    people : async () => {
        const people = await Users.findAll();
        const len = people.length;
        return len;
    },

    //사용자 정보
    userInfo : async (uid) => {
        const user = await Users.findOne({attributes : ['uid', 'email', 'username', 'height', 'weight', 'gender', 'birth'], where : { uid : `${uid}` }, raw : true });
        return user;
    },

    //login과 코드 같음...?
    findById : async (uid) => {
        const user = await Users.findOne({ where: { uid: `${uid}` }, raw: true });
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

    secede : async (uid) => {
        const user = await Users.findOne({ where : { uid : `${uid}`}, raw : true });
        if(user) {
            user = await Users.update({expired_at : Sequelize.literal("NOW()")}, {where : {uid : `${uid}`}})
        }
        return user;
    },

    updateHealth : async (health,uid) => {
        const user = await Users.update({ health : `${health}` }, {where : { uid : `${uid}` }, raw : true});
        return user;
    },

    addUserNutritional : async (uid, nid) => {
        const find = await UserNutrient.findOne({where : { uid : `${uid}`, nid : `${nid}`}, raw : true});
        if(find != null && find.expired_at == null) return;
        else if(find != null && find.expired_at != null) {
            const updateUserNutrient = await UserNutrient.update({updated_at : Sequelize.literal("NOW()"), expired_at : Sequelize.literal("null")}, {where : {uid : `${uid}`, nid : `${nid}`}, raw : true});
            return updateUserNutrient;
        }
        else {
            const addusernutritional = await UserNutrient.create({uid : uid, nid : nid, count : 1});
            return addusernutritional;
        }
        
    },

    userNutrientLog : async (uid) => {
        const log = await UserNutrient.findAll({attributes : ['nid', 'created_at', 'updated_at', 'expired_at'], where : {uid : `${uid}`}, order : [['updated_at', 'DESC']], limit : 5, raw : true});        
        return log;
    }
    
};

export default User;