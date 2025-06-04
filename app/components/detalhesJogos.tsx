import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../css/style";
import { useCRUD } from "../services/api";

export default function DetalhesJogos() {
  const params = useLocalSearchParams();
  const { update } = useCRUD("jogos");
  const router = useRouter();

  const [nome, setNome] = useState(params.nome as string);
  const [empresa, setEmpresa] = useState(params.empresa as string);
  const [valor, setValor] = useState(params.valor as string);
  const [lancamento, setLancamento] = useState(params.lancamento as string);
  const [genero, setGenero] = useState(params.genero as string);
  const [consoles, setConsoles] = useState(params.consoles as string);
  const [avaliacao, setAvaliacao] = useState(
    params.avaliacao?.toString() || ""
  );

  const handleSalvar = async () => {
    try {
      if (!nome) {
        Alert.alert("Campo obrigatório", "O campo Nome não pode estar vazio.");
        return;
      }
      if (!empresa) {
        Alert.alert(
          "Campo obrigatório",
          "O campo Empresa não pode estar vazio."
        );
        return;
      }
      if (!valor) {
        Alert.alert("Campo obrigatório", "O campo Valor não pode estar vazio.");
        return;
      }
      if (!lancamento) {
        Alert.alert(
          "Campo obrigatório",
          "O campo Lançamento não pode estar vazio."
        );
        return;
      }
      if (!genero) {
        Alert.alert(
          "Campo obrigatório",
          "O campo Gênero não pode estar vazio."
        );
        return;
      }
      if (!consoles) {
        Alert.alert(
          "Campo obrigatório",
          "O campo Consoles não pode estar vazio."
        );
        return;
      }
      if (!avaliacao) {
        Alert.alert(
          "Campo obrigatório",
          "O campo Avaliação não pode estar vazio."
        );
        return;
      }

      const avaliacaoNumerica = Number(avaliacao);
      if (
        isNaN(avaliacaoNumerica) ||
        avaliacaoNumerica < 1 ||
        avaliacaoNumerica > 10
      ) {
        Alert.alert(
          "Avaliação inválida",
          "A avaliação deve ser um número entre 1 e 10."
        );
        return;
      }

      const dataLancamento = new Date(lancamento);
      if (isNaN(dataLancamento.getTime())) {
        Alert.alert(
          "Data inválida",
          "Data de lançamento inválida. Use o formato AAAA-MM-DD"
        );
        return;
      }

      await update(params.id as string, {
        nome,
        empresa,
        valor,
        lancamento,
        genero,
        consoles,
        avaliacao: avaliacaoNumerica,
      });
      Alert.alert("Sucesso", "Jogo atualizado com sucesso!");
      router.replace("../components/listaJogos");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível atualizar o jogo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Jogo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        style={styles.input}
        value={empresa}
        onChangeText={setEmpresa}
        placeholder="Empresa"
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Valor"
        placeholderTextColor="#F3F3F3"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={lancamento}
        onChangeText={setLancamento}
        placeholder="Lançamento (AAAA-MM-DD)"
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholder="Gênero"
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        style={styles.input}
        value={consoles}
        onChangeText={setConsoles}
        placeholder="Consoles"
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        style={styles.input}
        value={avaliacao}
        onChangeText={setAvaliacao}
        placeholder="Avaliação (1 a 5)"
        placeholderTextColor="#F3F3F3"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
