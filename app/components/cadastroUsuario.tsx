import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../css/style";
import { cadastrarUsuario } from "../services/api";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    setLoading(true);
    try {
      await cadastrarUsuario({ nome, email, senha });
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#F3F3F3"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#F3F3F3"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#F3F3F3"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
