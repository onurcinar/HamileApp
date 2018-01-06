import React, { Component } from "react";
import Login from "./LoginScreen.js";
import SignUp from "./SignUpScreen.js";
import StepTwo from "./StepTwoScreen.js";
import StepThree from "./StepThreeScreen.js";
import test from "../Auth/views/LoginView.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  StepTwo: { screen: StepTwo },
  StepThree: { screen: StepThree }
}));