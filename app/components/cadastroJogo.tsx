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

  const formatarMoeda = (valor: string) => {
    // Remove todos os caracteres não numéricos
    const apenasNumeros = valor.replace(/\D/g, "");

    // Converte para número e divide por 100 para considerar os centavos
    const valorNumerico = Number(apenasNumeros) / 100;

    // Formata o número para o padrão brasileiro
    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatarData = (texto: string) => {
    // Remove todos os caracteres não numéricos
    const apenasNumeros = texto.replace(/\D/g, "");

    // Aplica a máscara de data
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

    // Verifica meses com 30 dias
    if ([4, 6, 9, 11].includes(mes) && dia > 30) return false;

    // Verifica fevereiro
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
    // Remove caracteres não numéricos
    const apenasNumeros = texto.replace(/\D/g, "");

    // Se o texto estiver vazio, permite apagar
    if (texto === "") {
      setAvaliacao("");
      return;
    }

    // Limita a 2 dígitos
    if (apenasNumeros.length <= 2) {
      const numero = parseInt(apenasNumeros);

      // Verifica se o número está entre 1 e 10
      if (numero <= 10) {
        setAvaliacao(apenasNumeros);
      }
    }
  };

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

      // Converte a data do formato DD/MM/AAAA para AAAA-MM-DD
      const [dia, mes, ano] = lancamento.split("/");
      const dataLancamento = new Date(`${ano}-${mes}-${dia}`);

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
        onChangeText={handleValorChange}
        placeholder="Valor"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
      />
      <TextInput
        value={lancamento}
        onChangeText={handleLancamentoChange}
        placeholder="Data de Lançamento (DD/MM/AAAA)"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
        maxLength={10}
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
        onChangeText={handleAvaliacaoChange}
        placeholder="Avaliação (1 a 10)"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#F3F3F3"
        maxLength={2}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Jogo;
