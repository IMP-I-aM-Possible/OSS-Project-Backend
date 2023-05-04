import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Users } from "./models/user.js";

const User = {
    login : async (uid) => {
        const user = await Users.findOne({ where: { uid: `${uid}` }, raw: true });
        return user;
    },

    signup : async (client) => {

        const user = await Users.create(client
            // id : `${client.id}`,
            // email : `${client.email}`,
            // pw : `${client.pw}`,
            // username : `${client.username}`,
            // height : `${client.height}`,
            // weight : `${client.weight}`,
            // birth : `${client.birth}`,
            // gender : `${client.gender}`
        );

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
        console.log(user.birth);
        const query = `SELECT FLOOR(DATEDIFF(NOW(), '${user.birth}') / 365);`;
        const getAge = await sequelize.query(query, { type : Sequelize.QueryTypes.SELECT });
        const age = Object.values(getAge[0])[0];
        return age;
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
        const user = await Users.update({ health : `${health}` }, {where : { uid : `${uid}` }});
        return user;
    }
    
};

export default User;