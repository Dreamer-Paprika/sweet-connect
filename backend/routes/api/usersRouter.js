import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { signupUser, loginUser, logoutUser, getCurrentUsers} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signupUser));

router.post("/login", ctrlWrapper(loginUser));

router.get("/logout", authenticateToken, ctrlWrapper(logoutUser));

router.get("/current", authenticateToken, ctrlWrapper(getCurrentUsers));

export { router };
