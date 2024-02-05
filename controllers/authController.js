import usermodel from "../models/usermodel.js";
import { hashPassword, comparePassword } from "../helpers/authhelper.js";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";

export const registercontroller = async (req, res) => {
  try {
    const { name, email, dob, password, phoneno, address } = req.body;

    //Verification
    if (!name) {
      return res.send({ message: "Name is required!" });
    }
    if (!email) {
      return res.send({ message: "email is required!" });
    }
    if (!dob) {
      return res.send({ message: "Date of Birth is required!" });
    }
    if (!password) {
      return res.send({ message: "password is required!" });
    }
    if (!phoneno) {
      return res.send({ message: "phoneno is required!" });
    }
    if (!address) {
      return res.send({ message: "address is required!" });
    }

    //Checkuser
    const existingUser = await usermodel.findOne({ email });

    //If user Existed
    if (existingUser) {
      res.status(201).send({
        success: true,
        message: "Already Registerd Please Login",
      });
    }

    //hashed password
    const hashed = await hashPassword(password);

    // model

    const user = await new usermodel({
      name,
      email,
      dob,
      password: hashed,
      phoneno,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "user register succesfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registering New User",
      error,
    });
  }
};

// Login

export const Logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Verification
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is Not Registerd",
      });
    }

    //
    const compare = await comparePassword(password, user.password);
    if (!compare) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    const token = await JWT.sign({ _id: user.id }, process.env.JWT_Secret, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Signin Successfully!",
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
        phoneno: user.phoneno,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// TestController
export const testcontroller = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
