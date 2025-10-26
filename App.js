import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from './src/components/ProductCard';
import { fetchProducts } from './src/data/products';
import { InteractionManager } from 'react-native';

export default function App() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(async () => {
      const data = await fetchProducts();
      setProducts(data);
      setVisibleProducts(data.slice(0, 10));
      setLoading(false);
    });

    return () => interaction.cancel();
  }, []);

  const toggleProductCount = () => {
    setShowAll((prev) => !prev);
    setVisibleProducts(showAll ? products.slice(0, 10) : products);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            name={item.title}
            price={`$${item.price}`}
            image={item.thumbnail}
          />
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
      />

      <TouchableOpacity style={styles.button} onPress={toggleProductCount}>
        <Text style={styles.buttonText}>
          {showAll ? 'Show 10 Products' : 'Show 20 Products'}
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#333' },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
