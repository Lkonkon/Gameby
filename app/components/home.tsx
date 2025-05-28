import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../css/style";

export default class home extends Component {
  render() {
    return (
      <View style={styles.containerHome}>
        <TouchableOpacity style={styles.buttonHome}>
          <Image
            source={{
              uri: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_games_48px-512.png",
            }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Cadastrar Jogos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHome}>
          <Image
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami18-67-512.png",
            }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Listar Jogos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHome}>
          <Image
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_exit2-512.png",
            }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
