import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "../css/style";
import { useCRUD } from "../services/api";

interface Jogo {
  id?: number;
  nome: string;
  empresa: string;
  valor: string;
  lancamento: Date;
  genero: string;
  consoles: string;
  avaliacao: number;
}

const Jogo = () => {
  const { data, loading, error, getAll, remove } = useCRUD<Jogo>("jogos");
  const router = useRouter();

  useEffect(() => {
    getAll();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      Alert.alert("Jogo excluído!", "Jogo excluído com sucesso!");
      getAll();
    } catch (err) {
      console.error("Erro ao excluir jogo:", err);
    }
  };

  const JogoData = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de jogos:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#196e52" />
      ) : error ? (
        <Text style={{ color: "red" }}>Erro ao carregar jogos</Text>
      ) : (
        <FlatList
          style={{ width: "80%" }}
          data={JogoData}
          renderItem={({ item }) => (
            <View style={styles.containerLista}>
              <TouchableOpacity
                style={styles.buttonCard}
                onPress={() =>
                  router.push({
                    pathname: "../components/detalhesJogos",
                    params: { ...item, lancamento: item.lancamento.toString() },
                  })
                }
              >
                <View style={styles.buttonCardHeader}>
                  <View style={styles.buttonCardHeaderText}>
                    <Text style={styles.headerText}>
                      {item.nome}
                    </Text>
                    <Text style={styles.headerText}>
                      {"R$ " + item.valor}
                    </Text>
                  </View>
                  <View style={styles.buttonCardFooterText}>
                    <Text style={styles.footerText}>
                      {item.genero}
                    </Text>
                    <Text style={styles.footerText}>
                      {item.consoles}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => item.id && handleDelete(item.id)}
                >
                  <Icon name="delete" size={24} color="#E50000" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
        />
      )}
    </View>
  );
};

export default Jogo;
