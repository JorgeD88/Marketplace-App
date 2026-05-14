import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { auth, db } from "../firebase/firebaseConfig";

export default function AddItemScreen({ navigation }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAddItem = async () => {
    if (
      !itemName ||
      !description ||
      !price ||
      !category ||
      !condition ||
      !location
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (!auth.currentUser) {
      setMessage("You must be logged in to add an item.");
      return;
    }

    try {
      await addDoc(collection(db, "items"), {
        itemName,
        description,
        price,
        category,
        condition,
        location,
        imageUrl,
        sellerId: auth.currentUser.uid,
        sellerEmail: auth.currentUser.email,
        createdAt: new Date(),
      });

      setMessage("");
      navigation.navigate("Home");
    } catch (error) {
      setMessage("Error adding item. Please try again.");
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Condition"
        value={condition}
        onChangeText={setCondition}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL optional"
        value={imageUrl}
        onChangeText={setImageUrl}
        autoCapitalize="none"
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f4f7fb",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    color: "#dc2626",
    marginBottom: 10,
    textAlign: "center",
  },
});
