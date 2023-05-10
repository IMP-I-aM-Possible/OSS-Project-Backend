import dotenv from 'dotenv';

dotenv.config();

const chatService = {

    getData : async (chat) => {
        
        const response = await fetch(process.env.FLASK_SERVER + chat);
        const json = await response.json();
        return json;
        // 데이터로 무언가 수행
    }

}

export default chatService;