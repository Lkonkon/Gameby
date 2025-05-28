import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#012e40",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#f3f3f3",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#F3F3F3",
  },
  button: {
    backgroundColor: "#026773",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#F3F3F3",
    fontWeight: "bold",
  },
  containerHome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#012e40",
  },
  buttonHome: {
    backgroundColor: "#026773",
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    flexDirection: "row",
  },
  image: {
    width: 24,
    height: 24,
    tintColor: "#F3F3F3",
    marginRight: 10,
  },
});
