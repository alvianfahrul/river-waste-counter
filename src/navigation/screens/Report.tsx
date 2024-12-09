import { Button, Text } from "@react-navigation/elements";
import { StyleSheet, View, Image, Dimensions } from "react-native";

import warningOctagon from "../../assets/warning-octagon.png";

const { width } = Dimensions.get("window");

export function Report() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      <Image source={warningOctagon} style={[styles.image]} />
      <Button style={styles.button}>Buat laporan baru</Button>
      <Button style={styles.button}>Lihat riwayat laporan anda</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "10%",
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  image: {
    marginVertical: "10%",
  },
  button: {
    width: "90%",
    paddingVertical: "4%",
    marginVertical: "1%",
  },
});
