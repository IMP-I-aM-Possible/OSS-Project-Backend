import dotenv from 'dotenv';
import Nutritional from "../database/Nutritional.js";
dotenv.config();

const searchService = {

    getData : async (ask,offset) => {
        const response = await fetch(process.env.FLASK_SERVER + "ask/" + ask);
        const getdata = await response.json();
        const includeInfo = await Nutritional.getSymptomNutritional(getdata[0],getdata[1],getdata[2],getdata[3],getdata[4],offset)
        const len = includeInfo.length
        if (!len){
            return {sc:400}
        }
        return {sc:200,includeInfo,len};
        // 데이터로 무언가 수행
    },

    chatBot : async (chat) => {
        const response = await fetch(process.env.FLASK_SERVER + "chat/" + chat);
        const chatbot = await response.json();
        return chatbot;
    }

}

export default searchService;