import { login, signUp } from '../../database/query.js';
import bcrypt from "bcrypt";

class User {

    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;

        try {
            const response = await login(client.id);

            if (response) {
                if (bcrypt.compareSync(client.pw, response.pw)) {
                    return { success: true, msg: "로그인 성공" };
                } else {
                    return { success: false, msg: "비밀번호 틀림" };
                }
            }

            return { success: false, msg: "존재 하지 않는 아이디" };

        } catch (err) {
            return { succness: false, msg: err };
        }
    }

    async signUp() {
        const client = this.body;
        const bcryptPw = bcrypt.hashSync(client.pw, 10);
        client.pw = bcryptPw;
        try {
            const response = await signUp(client);
            if (response.success) {
                return { success: true, msg: "회원가입 성공" }
            }
            //return {success : false, msg : "회원가입 실패"};
        } catch (err) {
            return { success: false, msg: "이미 존재하는 아이디 입니다." };
        }
    }
}

export default User;