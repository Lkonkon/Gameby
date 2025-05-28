import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
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
        name="components/cadastro"
        options={{
          headerShown: true,
          title: "Cadastro",
          headerStyle: { backgroundColor: "#012e40" },
          headerTintColor: "#F3F3F3",
        }}
      />
    </Stack>
  );
}
