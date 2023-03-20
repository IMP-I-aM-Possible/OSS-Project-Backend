import  express  from "express";
import {login} from "./auth/login.js";
import {signUp} from "./auth/sign-up.js";

const router = express.Router();

router.use("/login", login);
router.use("/signUp", signUp);

export default router;