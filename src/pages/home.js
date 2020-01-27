import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Tab,
  Tabs,
  Card,
  CardItem,
  Body,
  Left,
  Spinner
} from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
import apiMusic from "./../services/apiMusica";

export default class App extends React.Component {
  state = {
    dataSourceMusic: [],
    dataSourceAlbum: [],
    search: "",
    artistID: 0,
    loading: true
  };

  renderItemMusic = ({ item }) => {
    return (
      <Card>
        <CardItem header>
          <Left>
            <Image style={styles.album} source={{ uri: item.artworkUrl100 }} />
            <View style={styles.cardView}>
              <Text style={styles.CardTrackName}>{item.trackName}</Text>
            </View>
          </Left>
        </CardItem>
      </Card>
    );
  };
  renderItemAlbum = ({ item }) => {
    return (
      <Card>
        <CardItem header>
          <Left>
            <Image style={styles.album} source={{ uri: item.artworkUrl100 }} />
            <View style={styles.cardView}>
              <Text style={styles.CardTrackName}>{item.collectionName}</Text>
            </View>
          </Left>
        </CardItem>
      </Card>
    );
  };
  loadArtist = name => {
    apiMusic
      .get("search?term=" + name + "&entity=song")
      .then(response => {
        this.setState({ dataSourceMusic: response.data.results });
      })
      .catch(function(error) {
        console.log(error);
      });
    apiMusic
      .get("search?term=" + name + "&entity=album")
      .then(response => {
        this.setState({ dataSourceAlbum: response.data.results });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  defaultState = () => {
    const artist = "Billie Eilish";
    const entity = "song";

    apiMusic
      .get("search?term=" + artist + "&entity=" + entity)
      .then(response => {
        this.setState({
          dataSourceMusic: response.data.results,
          loading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    apiMusic
      .get("search?term=" + artist + "&entity=album")
      .then(response => {
        this.setState({ dataSourceAlbum: response.data.results });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.defaultState();
  }
  render() {
    if (this.state.loading) {
      return (
        <View>
          <Spinner
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
            color="red"
          />
        </View>
      );
    }
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
            <Input
              onSubmitEditing={() => this.loadArtist(this.state.search)}
              onChangeText={text => this.setState({ search: text })}
              placeholder="Busque por um artista"
            />
            <Icon name="ios-people" />
          </Item>
          <Button
            onPress={() => {
              this.loadArtist(this.state.search);
            }}
          >
            <Text>Busque por um artista</Text>
          </Button>
        </Header>
        <Tabs>
          <Tab heading="Músicas">
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.dataSourceMusic}
              renderItem={this.renderItemMusic}
            />
          </Tab>
          <Tab heading="Álbuns">
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.dataSourceAlbum}
              renderItem={this.renderItemAlbum}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    padding: 5
  },
  album: {
    width: 60,
    height: 60,
    borderRadius: 63,
    borderWidth: 4
  },
  CardTrackName: {
    marginLeft: 15,
    flexShrink: 1
  },
  cardView: {
    flexDirection: "row",
    flexShrink: 1
  }
});
