import chatService from "../services/chatService.js";

const chatController = {

    getData : async (req, res) => {

        const response = await chatService.getData(req.params.chat);
        res.json(response);
        // 데이터로 무언가 수행
    }

}

export default chatController;