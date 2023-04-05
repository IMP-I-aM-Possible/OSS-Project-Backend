import express from "express";
import nutritionalController from "../controllers/nutritionalController.js";

const nutritionalRouter = express.Router();

//영양제 전체
nutritionalRouter.get("/information", nutritionalController.getNutritional);

//영양소가 포함된 영양제
nutritionalRouter.get("/include", nutritionalController.getIncludeInfo);

//사용자 섭취목록 추가 
nutritionalRouter.get("/add", nutritionalController.addUserNutrient);

//사용자 섭취목록 삭제 
nutritionalRouter.get("/delete", nutritionalController.deleteUserNutrient);

//해당 영양제
nutritionalRouter.get("/:nutritional_id", nutritionalController.getProduct);


export default nutritionalRouter;