import searchService from "../services/searchService.js";

const searchController = {

    getData : async (req, res) => {
        try {
            const symptom = await searchService.getData(req.params.ask,req.query.offset);
            res.json(symptom);
            // 데이터로 무언가 수행
        } catch (err) {
            res.json(err);
        }
    },

    chatBot : async (req, res) => {
        try {
            const chatbot = await searchService.chatBot(req.params.chat);
            res.json(chatbot);
        } catch (err) {
            res.json(err);
        }
    }

}

export default searchController;