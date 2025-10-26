import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  InteractionManager,
} from "react-native";

import ProductCard from "./scr/components/ProductCard";
import ProductsData from "./scr/data/products";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setProducts(ProductsData);
        setLoading(false);
      }, 1000);
    });

    return () => task.cancel();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard name={item.name} price={item.price} image={item.image} />
    ),
    []
  );

  const toggleItemCount = () => setShowAll((prev) => !prev);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title={showAll ? "Show 10 Products" : "Show 20 Products"}
        onPress={toggleItemCount}
      />

      <FlatList
        data={showAll ? products : products.slice(0, 10)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F8F9FA",
  },
  list: {
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
