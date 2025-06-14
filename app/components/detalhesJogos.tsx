import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // Formata o valor inicial
    if (valor) {
      // Converte o valor para número e formata
      const valorNumerico = parseFloat(valor);
      const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setValor(valorFormatado);
    }

    // Formata a data inicial
    if (lancamento) {
      const data = new Date(lancamento);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      setLancamento(`${dia}/${mes}/${ano}`);
    }
  }, []);

  const formatarMoeda = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const valorNumerico = Number(apenasNumeros) / 100;
    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatarData = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");

    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    } else if (apenasNumeros.length <= 4) {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
    } else {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(
        2,
        4
      )}/${apenasNumeros.slice(4, 8)}`;
    }
  };

  const validarData = (data: string): boolean => {
    const partes = data.split("/");
    if (partes.length !== 3) return false;

    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const ano = parseInt(partes[2]);

    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return false;
    if (dia < 1 || dia > 31) return false;
    if (mes < 1 || mes > 12) return false;
    if (ano < 1900 || ano > 2100) return false;

    if ([4, 6, 9, 11].includes(mes) && dia > 30) return false;

    if (mes === 2) {
      const isBissexto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
      if (isBissexto && dia > 29) return false;
      if (!isBissexto && dia > 28) return false;
    }

    return true;
  };

  const handleValorChange = (texto: string) => {
    const valorSemFormatacao = texto.replace(/\D/g, "");
    if (valorSemFormatacao.length <= 10) {
      const valorFormatado = formatarMoeda(valorSemFormatacao);
      setValor(valorFormatado);
    }
  };

  const handleLancamentoChange = (texto: string) => {
    const valorSemFormatacao = texto.replace(/\D/g, "");
    if (valorSemFormatacao.length <= 8) {
      const dataFormatada = formatarData(valorSemFormatacao);
      setLancamento(dataFormatada);
    }
  };

  const handleAvaliacaoChange = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");

    if (texto === "") {
      setAvaliacao("");
      return;
    }

    if (apenasNumeros.length <= 2) {
      const numero = parseInt(apenasNumeros);
      if (numero <= 10) {
        setAvaliacao(apenasNumeros);
      }
    }
  };

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
      if (!validarData(lancamento)) {
        Alert.alert(
          "Data inválida",
          "Por favor, insira uma data válida no formato DD/MM/AAAA"
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

      const valorNumerico = valor.replace(/\D/g, "");
      const valorFormatado = (Number(valorNumerico) / 100).toString();

      const avaliacaoNumerica = Number(avaliacao);
      if (avaliacaoNumerica < 1 || avaliacaoNumerica > 10) {
        Alert.alert(
          "Avaliação inválida",
          "A avaliação deve ser um número entre 1 e 10."
        );
        return;
      }

      const [dia, mes, ano] = lancamento.split("/");
      const dataLancamento = new Date(`${ano}-${mes}-${dia}`);

      await update(params.id as string, {
        nome,
        empresa,
        valor: valorFormatado,
        lancamento: dataLancamento,
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
        onChangeText={handleValorChange}
        placeholder="Valor"
        placeholderTextColor="#F3F3F3"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={lancamento}
        onChangeText={handleLancamentoChange}
        placeholder="Data de Lançamento (DD/MM/AAAA)"
        placeholderTextColor="#F3F3F3"
        keyboardType="numeric"
        maxLength={10}
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
        onChangeText={handleAvaliacaoChange}
        placeholder="Avaliação (1 a 10)"
        placeholderTextColor="#F3F3F3"
        keyboardType="numeric"
        maxLength={2}
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
