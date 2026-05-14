import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));

      const loadedItems = [];

      querySnapshot.forEach((doc) => {
        loadedItems.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setItems(loadedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.itemName?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ItemDetails", {
          item,
        })
      }
    >
      <Image
        source={{
          uri: item.imageUrl || "https://via.placeholder.com/300",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{item.itemName}</Text>

      <Text style={styles.price}>${item.price}</Text>

      <Text style={styles.category}>{item.category}</Text>

      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>

      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Marketplace</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Text style={styles.addButtonText}>+ Add New Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.myListingsButton}
        onPress={() => navigation.navigate("MyListings")}
      >
        <Text style={styles.addButtonText}>My Listings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.addButtonText}>Profile</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.search}
        placeholder="Search items..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f7fb",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#2563eb",
    marginTop: 4,
  },
  category: {
    marginTop: 4,
    color: "#555",
  },
  description: {
    marginTop: 6,
    color: "#666",
  },
  location: {
    marginTop: 6,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  myListingsButton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
  },
  profileButton: {
    backgroundColor: "#64748b",
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
  },
});
