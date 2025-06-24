import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../css/style";

export default class home extends Component {
  render() {
    const router = useRouter();
    return (
      <View style={styles.containerHome}>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => router.push("../components/cadastroJogo")}
        >
          <MaterialIcons
            name="games"
            size={28}
            color="white"
            style={styles.iconHome}
          />
          <Text style={styles.buttonText}>Cadastrar Jogos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => router.push("../components/listaJogos")}
        >
          <Ionicons
            name="list"
            size={28}
            color="white"
            style={styles.iconHome}
          />
          <Text style={styles.buttonText}>Listar Jogos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => router.replace("/")}
        >
          <Ionicons
            name="exit-outline"
            size={28}
            color="white"
            style={styles.iconHome}
          />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
