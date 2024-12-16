import { Button } from "@react-navigation/elements";
import { StyleSheet, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export function CreateReport() {
  const navigation = useNavigation();

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      navigation.navigate("FormReport", {
        image: image
      });
    }
  };

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      navigation.navigate("FormReport", {
        image: image
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={openCamera}>
        Ambil Foto
      </Button>

      <Button style={styles.button} onPress={openGallery}>
        Pilih dari Galeri
      </Button>
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
    fontSize: 16,
  },
  button: {
    width: "90%",
    paddingVertical: 10,
    marginVertical: 5,
  },
});
