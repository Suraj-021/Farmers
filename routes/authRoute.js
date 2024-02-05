import express from "express";
import {
  registercontroller,
  Logincontroller,
  testcontroller,
} from "../controllers/authController.js";
import { RequireSignin, isAdmin } from "../middlewares/authmiddleware.js";
//Router object
const route = express.Router();

//Register Method Post
route.post("/register", registercontroller);

//Login Method POST
route.post("/login", Logincontroller);

// Middleware Method get
route.get("/test", RequireSignin, isAdmin, testcontroller);

export default route;
