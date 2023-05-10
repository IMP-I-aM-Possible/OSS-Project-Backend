import express from "express";
import nutritionalController from "../controllers/nutritionalController.js";

const nutritionalRouter = express.Router();

//영양제 전체
nutritionalRouter.get("/information", nutritionalController.getNutritional);

//영양소가 포함된 영양제
nutritionalRouter.get("/include", nutritionalController.getIncludeInfo);

//부영양소가 포함된 영양제
nutritionalRouter.get("/include/sub", nutritionalController.search);

//해당 영양제
nutritionalRouter.get("/:nid", nutritionalController.getProduct);

export default nutritionalRouter;