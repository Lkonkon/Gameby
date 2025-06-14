import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen
        name="splash"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
      <Stack.Screen
        name="components/home"
        options={{
          headerShown: false,
          title: "",
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
      <Stack.Screen
        name="components/cadastroUsuario"
        options={{
          headerShown: true,
          title: "Cadastro",
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
      <Stack.Screen
        name="components/cadastroJogo"
        options={{
          headerShown: true,
          title: "Cadastro de Jogos",
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
      <Stack.Screen
        name="components/listaJogos"
        options={{
          headerShown: true,
          title: "Lista de Jogos",
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
      <Stack.Screen
        name="components/detalhesJogos"
        options={{
          headerShown: true,
          title: "Detalhes do Jogo",
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
    </Stack>
  );
}
