import express  from "express";
import searchController from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get(
    "/chatbot/:chat",
    searchController.chatBot
);

searchRouter.get(
    "/:ask",
    searchController.getData
);

export default searchRouter;