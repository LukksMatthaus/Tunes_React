import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Tab,
  Tabs
} from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
export default function App() {
  return (
    <Container>
      <Header
        searchBar
        hasTabs
        androidStatusBarColor="#000000"
        style={{
          paddingTop: getStatusBarHeight(),
          height: 54 + getStatusBarHeight()
        }}
      >
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Tabs>
        <Tab heading="Músicas"></Tab>
        <Tab heading="Albuns"></Tab>
      </Tabs>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});
