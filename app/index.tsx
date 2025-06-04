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
import { styles } from "./css/style";
import { loginUsuario } from "./services/api";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("teste3@gmail.com");
  const [senha, setSenha] = useState("123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginUsuario({ email, senha, nome: "" });
      router.push("/components/home");
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Erro", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de login</Text>
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
        placeholder="Password"
        placeholderTextColor="#F3F3F3"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../components/cadastroUsuario")}
      >
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
