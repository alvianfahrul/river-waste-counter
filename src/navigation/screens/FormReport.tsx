import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  Modal,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";

export function FormReport({ route }: any) {
  const navigation = useNavigation();
  
  const { image } = route.params;
  const [sungai, setSungai] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const submitReport = async () => {
    if (!image || !sungai || !lokasi || !deskripsi) {
      Alert.alert("Error", "Semua field harus diisi.");
      return;
    }

    try {
      const response = await FileSystem.uploadAsync(
        process.env.EXPO_PUBLIC_API_URL + "/predict",
        image.uri,
        {
          fieldName: "image",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          parameters: {
            sungai,
            lokasi,
            deskripsi,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          },
        }
      );

      if (response.status === 201) {
        const responseData = JSON.parse(response.body);
        setResponse(responseData);
        setModalVisible(true);
      } else {
        Alert.alert("Error", "Gagal mengirim laporan. Periksa kembali data.");
        console.error("Error response:", response);
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat mengirim laporan.");
      console.error("Upload error:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("HomeTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Laporan Sungai</Text>

      {image.uri && (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Nama Sungai"
        value={sungai}
        onChangeText={setSungai}
      />
      <TextInput
        style={styles.input}
        placeholder="Lokasi"
        value={lokasi}
        onChangeText={setLokasi}
      />
      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={deskripsi}
        onChangeText={setDeskripsi}
        multiline
      />

      <Button title="Kirim Laporan" onPress={submitReport} />

      {/* Modal untuk menampilkan rincian */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rincian Laporan</Text>
          {response && (
            <>
              <Text><Text style={styles.bold}>Sungai:</Text> {response.data.sungai}</Text>
              <Text><Text style={styles.bold}>Lokasi:</Text> {response.data.lokasi}</Text>
              <Text><Text style={styles.bold}>Deskripsi:</Text> {response.data.deskripsi}</Text>
              <Text><Text style={styles.bold}>Latitude:</Text> {response.data.coordinates.latitude}</Text>
              <Text><Text style={styles.bold}>Longitude:</Text> {response.data.coordinates.longitude}</Text>
              <Text><Text style={styles.bold}>Tanggal Dibuat:</Text> {response.data.createdAt}</Text>
              <Text><Text style={styles.bold}>Jumlah Sampah:</Text> {response.data.trashCount}</Text>
              <Image source={{ uri: response.data.fileUrl }} style={styles.imagePreview} />
            </>
          )}
          <Button title="OK" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10%",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: "3%",
    marginTop: "5%",
    marginBottom: "5%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: "5%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});
