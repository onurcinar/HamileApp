import React, { Component } from "react";
import HomeView from "./views/HomeView.js";
import LoginView from "./views/LoginView.js";
import RegisterView from "./views/RegisterView.js";
import ProtectedView from "./views/ProtectedView.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  HomeView: { screen: HomeView }, 
  LoginView: { screen: LoginView },
  RegisterView: { screen: RegisterView },
  ProtectedView: { screen: ProtectedView }
}));