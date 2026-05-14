import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;

  const [itemName, setItemName] = useState(item.itemName);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category);
  const [condition, setCondition] = useState(item.condition);
  const [location, setLocation] = useState(item.location);
  const [imageUrl, setImageUrl] = useState(item.imageUrl || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
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

    try {
      const itemRef = doc(db, "items", item.id);

      await updateDoc(itemRef, {
        itemName,
        description,
        price,
        category,
        condition,
        location,
        imageUrl,
      });

      navigation.navigate("MyListings");
    } catch (error) {
      console.log(error);
      setMessage("Error updating item.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Listing</Text>

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
        value={price.toString()}
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
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
