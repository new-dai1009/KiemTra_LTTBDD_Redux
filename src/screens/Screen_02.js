import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Screen_02 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('ALL'); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://6703b083ab8a8f8927313cb6.mockapi.io/nguyenbaodai/20015321/Bike');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (type) => {
    setSelectedType(type); 
    if (type === 'ALL') {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter(product => product.type === type);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>The World’s Best Bike</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => filterProducts('ALL')}
          style={[
            styles.button,
            selectedType === 'ALL' && styles.selectedButton 
          ]}
        >
          <Text style={selectedType === 'ALL' ? styles.selectedButtonText : styles.buttonText}>
            ALL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterProducts('Roadbike')}
          style={[
            styles.button,
            selectedType === 'Roadbike' && styles.selectedButton 
          ]}
        >
          <Text style={selectedType === 'Roadbike' ? styles.selectedButtonText : styles.buttonText}>
            Roadbike
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterProducts('Mountain')}
          style={[
            styles.button,
            selectedType === 'Mountain' && styles.selectedButton 
          ]}
        >
          <Text style={selectedType === 'Mountain' ? styles.selectedButtonText : styles.buttonText}>
            Mountain
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#ff5733', 
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff', 
  },
});

export default Screen_02;
