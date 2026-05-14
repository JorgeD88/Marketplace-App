import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ItemDetailsScreen({ route }) {
  const { item } = route.params;

  const handleContactSeller = () => {
    if (item.sellerEmail) {
      Linking.openURL(`mailto:${item.sellerEmail}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: item.imageUrl || "https://via.placeholder.com/300",
        }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.title}>{item.itemName}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.text}>{item.description}</Text>

        <Text style={styles.label}>Category</Text>
        <Text style={styles.text}>{item.category}</Text>

        <Text style={styles.label}>Condition</Text>
        <Text style={styles.text}>{item.condition}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.text}>{item.location}</Text>

        <Text style={styles.label}>Seller Email</Text>
        <Text style={styles.text}>{item.sellerEmail}</Text>

        <TouchableOpacity style={styles.button} onPress={handleContactSeller}>
          <Text style={styles.buttonText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  image: {
    width: "100%",
    height: 280,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 22,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
