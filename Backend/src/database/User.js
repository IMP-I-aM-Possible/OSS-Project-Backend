import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Users } from "./models/user.js";

const User = {
    login : async (id) => {
        const user = await Users.findOne({ where: { id: `${id}` }, raw: true });
        return user;
    },

    signup : async (client) => {

        console.log(client);
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
    getAge : async (id) => {
        const user = await Users.findOne({ where : { id : `${id}`}, raw : true });
        const query = `SELECT FLOOR((TO_DAYS(NOW()) - (TO_DAYS(${user.birth}))) / 365);`;
        const getAge = await sequelize.query(query, { type : Sequelize.QueryTypes.SELECT });
        const age = Object.values(getAge[0])[0];
        return age;
    },

    userInfo : async (id) => {
        const user = await Users.findOne({ where : { uid : `${id}` }, raw : true });
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
        const user = await Users.findOne({ where : { id : `${id}`}, raw : true });
        if(user) {
            user = await Users.update({expired_at : Sequelize.literal("now()")}, {where : {id : `${id}`}})
        }
        return user;
    },

    UpdateHealth : async (health,id) => {
        const user = await Users.update({ health : `${health}` }, {where : { id : `${id}` }})
        return user
    }
    
};

export default User;