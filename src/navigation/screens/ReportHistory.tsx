import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export function ReportHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
