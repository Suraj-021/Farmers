import express from "express";
import {
  registercontroller,
  Logincontroller,
  testcontroller,
  ForgotpassController,
} from "../controllers/authController.js";
import { RequireSignin, isAdmin } from "../middlewares/authmiddleware.js";
//Router object
const route = express.Router();

//Register Method Post
route.post("/register", registercontroller);

//Login Method POST
route.post("/login", Logincontroller);

//Forgot Password
route.post("/forgot_password", ForgotpassController);

// Middleware Method get
route.get("/test", RequireSignin, isAdmin, testcontroller);

//Protected Routes
route.get("/user-auth", RequireSignin, (req, res) => {
  res.status(200).send({ Ok: true });
});

export default route;
