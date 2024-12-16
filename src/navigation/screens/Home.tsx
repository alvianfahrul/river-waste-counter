import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

type Coordinates = {
  latitude: string;
  longitude: string;
};

type History = {
  id: string;
  sungai: string;
  deskripsi: string;
  lokasi: string;
  trashCount: number;
  createdAt: string;
  fileUrl: string;
  coordinates: Coordinates;
};

type RiverData = {
  id: string;
  history: History;
};

export function Home() {
  const [data, setData] = useState<RiverData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/predict/histories");
        setData(response.data.data);
      } catch (err) {
        setError((err as Error).message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Laporan Anda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {data.map(({ id, history }) => (
          <View key={id}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
                console.log(`Pressed: ${history.sungai}`);
              }}
              style={styles.card}
            >
              <View style={styles.cardTop}>
                <Image
                  alt={history.sungai}
                  style={styles.cardImg}
                  source={{ uri: history.fileUrl }}
                />
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{history.sungai}</Text>
                <Text style={styles.cardContent}>
                  {`Lokasi: ${history.lokasi}`}
                </Text>
                <Text style={styles.cardContent}>
                  {`Jumlah Sampah: ${history.trashCount}`}
                </Text>
                <Text style={styles.cardContent}>
                  {new Date(history.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: "8%",
  },
  header: {
    paddingHorizontal: "4%",
    marginBottom: "7%",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    textAlign: "center",
  },
  content: {
    paddingTop: "2%",
    paddingHorizontal: "4%",
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: "4%",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "row",
  },
  cardTop: {
    width: "40%",
    height: 150,
    padding: "3%",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  cardBody: {
    width: "60%",
    padding: "3%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#232425",
  },
  cardContent: {
    marginTop: "2%",
    fontSize: 16,
    color: "#595a63",
  },
});
