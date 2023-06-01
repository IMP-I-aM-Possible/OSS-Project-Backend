import  express  from "express";
import usersettingController from "../controllers/usersettingController.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const usersettingRouter = express.Router();

//userpage Main
usersettingRouter.post(
    "/", 
    usersettingController.userdata
    //verifyAccessToken,

);


export default usersettingRouter;