import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebaseConfig";

export default function MyListingsScreen({ navigation }) {
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "items"),
      where("sellerId", "==", auth.currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listings = [];

      querySnapshot.forEach((document) => {
        listings.push({
          id: document.id,
          ...document.data(),
        });
      });

      setMyItems(listings);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (itemId) => {
    const confirmed = window.confirm
      ? window.confirm("Are you sure you want to delete this listing?")
      : true;

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "items", itemId));
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.imageUrl || "https://via.placeholder.com/300",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{item.itemName}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.location}>{item.location}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditItem", { item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Listings</Text>

      {myItems.length === 0 ? (
        <Text style={styles.emptyText}>
          You have not added any listings yet.
        </Text>
      ) : (
        <FlatList
          data={myItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
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
  location: {
    marginTop: 4,
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
