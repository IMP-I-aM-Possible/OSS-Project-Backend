import express  from "express";
import chatController from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get(
    "/:chat", chatController.getData
);

export default chatRouter;