import  express  from "express";
import userpageController from "../controllers/userpageController.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const userpageRouter = express.Router();

//userpage Main
userpageRouter.post(
    "/", 
    //verifyAccessToken,
    userpageController.userdata
);

userpageRouter.post(
    "/delete",
    userpageController.deleteUserNutrient
)

export default userpageRouter;