import React, { Component } from "react";
import { Root } from "native-base";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import Home from "./pages/home";

const mainNavigator = createSwitchNavigator({
  HomePage: Home
});

const AppContainer = createAppContainer(mainNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);
