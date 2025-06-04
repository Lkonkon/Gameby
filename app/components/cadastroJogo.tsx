import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  const { create, getAll } = useCRUD<Jogo>("jogos");

  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [valor, setValor] = useState("");
  const [lancamento, setLancamento] = useState("");
  const [genero, setGenero] = useState("");
  const [consoles, setConsoles] = useState("");
  const [avaliacao, setAvaliacao] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  const handleSubmit = async () => {
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

      const valorFormatado = valor.replace(",", ".");
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

      const novoJogo = {
        nome,
        empresa,
        valor: valorFormatado,
        lancamento: dataLancamento,
        genero,
        consoles,
        avaliacao: avaliacaoNumerica,
      };

      await create(novoJogo);

      setNome("");
      setEmpresa("");
      setValor("");
      setLancamento("");
      setGenero("");
      setConsoles("");
      setAvaliacao("");
      Alert.alert("Cadastro realizado", "Jogo cadastrado com sucesso!");
    } catch (err) {
      Alert.alert("Erro", "Erro ao cadastrar jogo.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Jogos</Text>

      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />

      <TextInput
        value={empresa}
        onChangeText={setEmpresa}
        placeholder="Empresa"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />

      <TextInput
        value={valor}
        onChangeText={setValor}
        placeholder="Valor"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        value={lancamento}
        onChangeText={setLancamento}
        placeholder="Lancamento (AAAA-MM-DD)"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        value={genero}
        onChangeText={setGenero}
        placeholder="Genero"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        value={consoles}
        onChangeText={setConsoles}
        placeholder="Consoles"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        value={avaliacao}
        onChangeText={setAvaliacao}
        placeholder="Avaliacao (1 a 10)"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Jogo;
